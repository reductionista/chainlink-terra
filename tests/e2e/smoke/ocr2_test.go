package smoke_test

import (
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"github.com/smartcontractkit/chainlink-terra/tests/e2e/common"
	tc "github.com/smartcontractkit/chainlink-terra/tests/e2e/smoke/common"
	"github.com/smartcontractkit/integrations-framework/actions"
	"time"
)

var _ = Describe("Terra OCRv2 @ocr", func() {
	var state *tc.OCRv2State

	BeforeEach(func() {
		state = &tc.OCRv2State{}
		By("Deoloying the cluster", func() {
			state.DeployCluster(5, false)
			common.ImitateSource(state.MockServer, 1*time.Second, 2, 10)
		})
	})

	Describe("with Terra OCR2", func() {
		It("performs OCR2 round", func() {
			state.ValidateRoundsAfter(time.Now(), 10)
		})
	})

	AfterEach(func() {
		By("Tearing down the environment", func() {
			err := actions.TeardownSuite(state.Env, nil, "logs")
			Expect(err).ShouldNot(HaveOccurred())
		})
	})
})
