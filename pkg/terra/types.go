package terra

import (
	"fmt"
	"strings"

	cryptotypes "github.com/cosmos/cosmos-sdk/crypto/types"
	"github.com/smartcontractkit/libocr/offchainreporting2/types"
)

const (
	// Report data
	PrefixLen = 4 + 32 + 1
	MedianLen = 16
	JuelsLen  = 16
)

type TransmitMsg struct {
	Transmit TransmitPayload `json:"transmit"`
}

type TransmitPayload struct {
	ReportContext ByteArray      `json:"report_context"`
	Report        ByteArray      `json:"report"`
	Signatures    ByteArrayArray `json:"signatures"`
}

// ByteArrayArray and ByteArray implement custom unmarshalling because go unmarshals []byte and []uint8 to strings
type ByteArrayArray [][]byte
type ByteArray []byte

func (b ByteArray) MarshalJSON() ([]byte, error) {
	return unmarshalByteArrays(b)
}

func (b ByteArrayArray) MarshalJSON() ([]byte, error) {
	return unmarshalByteArrays(b)
}

func unmarshalByteArrays(b interface{}) ([]byte, error) {
	var result string
	if b == nil {
		result = "null"
	} else {
		result = strings.Join(strings.Fields(fmt.Sprintf("%d", b)), ",") // prints a number array in string form
	}
	return []byte(result), nil
}

type ConfigDetails struct {
	BlockNumber  uint64             `json:"block_number"`
	ConfigDigest types.ConfigDigest `json:"config_digest"`
}

type LatestTransmissionDetails struct {
	LatestConfigDigest types.ConfigDigest `json:"latest_config_digest"`
	Epoch              uint32             `json:"epoch"`
	Round              uint8              `json:"round"`
	LatestAnswer       string             `json:"latest_answer"`
	LatestTimestamp    int64              `json:"latest_timestamp"`
}

type LatestConfigDigestAndEpoch struct {
	ConfigDigest types.ConfigDigest `json:"config_digest"`
	Epoch        uint32             `json:"epoch"`
}

// WrappedPrivKey wraps the signer provided from the core keystore to the expected interface
type WrappedPrivKey struct {
	key TransmissionSigner
}

// protobuf methods (don't do anything)
func (k WrappedPrivKey) Reset()        {}
func (k WrappedPrivKey) ProtoMessage() {}
func (k WrappedPrivKey) String() string {
	return ""
}

func (k WrappedPrivKey) Bytes() []byte {
	return []byte{} // does not expose private key
}
func (k WrappedPrivKey) Sign(msg []byte) ([]byte, error) {
	return k.key.Sign(msg)
}
func (k WrappedPrivKey) PubKey() cryptotypes.PubKey {
	return k.key.PublicKey()
}
func (k WrappedPrivKey) Equals(a cryptotypes.LedgerPrivKey) bool {
	return k.PubKey().Address().String() == a.PubKey().Address().String()
}
func (k WrappedPrivKey) Type() string {
	return ""
}

// CL Core OCR2 job spec RelayConfig member for Terra
type RelayConfig struct {
	// network data
	NodeEndpointHTTP string `json:"nodeEndpointHTTP"`
	NodeEndpointWS   string `json:"nodeEndpointWS"`
	ChainID          string `json:"chainID"`
}
