package e2e

import "github.com/smartcontractkit/helmenv/environment"

// NewChainlinkTerraEnv returns a cluster config with LocalTerra node
func NewChainlinkTerraEnv() *environment.Config {
	return &environment.Config{
		NamespacePrefix: "chainlink-terra",
		Charts: environment.Charts{
			"localterra": {
				Index: 1,
			},
			//"mockserver-config": {
			//	Index: 2,
			//},
			//"mockserver": {
			//	Index: 3,
			//},
			//"chainlink": {
			//	Index: 4,
			//	Values: map[string]interface{}{
			//		"replicas": 1,
			//		"chainlink": map[string]interface{}{
			//			"image": map[string]interface{}{
			//				"image":   "public.ecr.aws/chainlink/chainlink",
			//				"version": "develop.57434211c414c766b221bcaeb4943366f129a8cf",
			//			},
			//		},
			//		"env": map[string]interface{}{
			//			"eth_url":                     "ws://localterra:1317",
			//			"eth_disabled":                "true",
			//			"USE_LEGACY_ETH_ENV_VARS":     "false",
			//			"FEATURE_OFFCHAIN_REPORTING2": "true",
			//			"feature_external_initiators": "true",
			//			"P2P_NETWORKING_STACK":        "V2",
			//			"P2PV2_LISTEN_ADDRESSES":      "0.0.0.0:6690",
			//			"P2PV2_DELTA_DIAL":            "5s",
			//			"P2PV2_DELTA_RECONCILE":       "5s",
			//			"p2p_listen_port":             "0",
			//		},
			//	},
			//},
		},
	}
}
