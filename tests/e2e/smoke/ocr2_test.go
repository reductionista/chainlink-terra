package smoke_test

import (
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"github.com/rs/zerolog/log"
	"github.com/smartcontractkit/chainlink-terra/tests/e2e"
	"github.com/smartcontractkit/helmenv/environment"
	"github.com/smartcontractkit/helmenv/tools"
	"github.com/smartcontractkit/integrations-framework/actions"
	"github.com/smartcontractkit/integrations-framework/client"
	"github.com/smartcontractkit/integrations-framework/contracts"
)

var _ = Describe("Terra OCRv2", func() {
	var (
		e              *environment.Environment
		nets           *client.Networks
		lt             contracts.LinkToken
		bac            contracts.OCRv2AccessController
		rac            contracts.OCRv2AccessController
		flags          contracts.OCRv2Flags
		validator      contracts.OCRv2Validator
		ocr2           contracts.OCRv2
		ocr2Proxy      contracts.OCRv2Proxy
		validatorProxy contracts.OCRv2ValidatorProxy
		err            error
	)

	BeforeEach(func() {
		By("Deploying the environment", func() {
			e, err = environment.DeployOrLoadEnvironment(
				e2e.NewChainlinkTerraEnv(),
				tools.ChartsRoot,
			)
			Expect(err).ShouldNot(HaveOccurred())
			err = e.ConnectAll()
			Expect(err).ShouldNot(HaveOccurred())
		})
		By("Setting up client", func() {
			networkRegistry := client.NewNetworkRegistry()
			networkRegistry.RegisterNetwork(
				"terra",
				e2e.ClientInitFunc(),
				e2e.ClientURLSFunc(),
			)
			nets, err = networkRegistry.GetNetworks(e)
			Expect(err).ShouldNot(HaveOccurred())
		})
		By("Deploying contracts", func() {
			cd := e2e.NewTerraContractDeployer(nets.Default)
			Expect(err).ShouldNot(HaveOccurred())
			bac, err = cd.DeployOCRv2AccessController()
			Expect(err).ShouldNot(HaveOccurred())
			rac, err = cd.DeployOCRv2AccessController()
			Expect(err).ShouldNot(HaveOccurred())
			lt, err = cd.DeployLinkTokenContract()
			Expect(err).ShouldNot(HaveOccurred())
			ocr2, err = cd.DeployOCRv2(bac.Address(), rac.Address(), lt.Address())
			Expect(err).ShouldNot(HaveOccurred())
			flags, err = cd.DeployOCRv2Flags(bac.Address(), rac.Address())
			Expect(err).ShouldNot(HaveOccurred())
			validator, err = cd.DeployOCRv2Validator(uint32(80000), flags.Address())
			Expect(err).ShouldNot(HaveOccurred())

			ocr2Proxy, err = cd.DeployOCRv2Proxy(ocr2.Address())
			Expect(err).ShouldNot(HaveOccurred())
			validatorProxy, err = cd.DeployOCRv2ValidatorProxy(validator.Address())
			Expect(err).ShouldNot(HaveOccurred())
			err = ocr2.SetBilling(uint32(1), uint32(1), bac.Address())
			Expect(err).ShouldNot(HaveOccurred())
		})
	})

	Describe("with Terra OCR2", func() {
		It("performs OCR2 round", func() {
			// TODO: awaiting relay implementation
			log.Warn().Str("ocr2Proxy", ocr2Proxy.Address()).Str("validatorProxy", validatorProxy.Address()).Send()
		})
	})

	AfterEach(func() {
		By("Tearing down the environment", func() {
			err = actions.TeardownSuite(e, nil, "logs")
			Expect(err).ShouldNot(HaveOccurred())
		})
	})
})
