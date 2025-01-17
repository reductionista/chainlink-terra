import { getRDD } from '../../../lib/rdd'
import { instructionToCommand, AbstractInstruction } from '../../abstract/wrapper'

type CommandInput = {
  billingAccessController: string
  requesterAccessController: string
  linkToken: string
  decimals: number
  description: string
  maxAnswer: string
  minAnswer: string
}

type ContractInput = {
  billing_access_controller: string
  requester_access_controller: string
  link_token: string
  decimals: number
  description: string
  max_answer: string
  min_answer: string
}

const makeCommandInput = async (flags: any): Promise<CommandInput> => {
  if (flags.input) return flags.input as CommandInput
  const rdd = getRDD(flags.rdd)
  const aggregator = rdd.contracts[flags.id]
  return {
    maxAnswer: aggregator.maxSubmissionValue,
    minAnswer: aggregator.minSubmissionValue,
    decimals: aggregator.decimals,
    description: aggregator.name,
    billingAccessController: process.env.BILLING_ACCESS_CONTROLLER || '',
    requesterAccessController: process.env.REQUESTER_ACCESS_CONTROLLER || '',
    linkToken: process.env.LINK || '',
  }
}

const makeContractInput = async (input: CommandInput): Promise<ContractInput> => {
  return {
    billing_access_controller: input.billingAccessController,
    requester_access_controller: input.requesterAccessController,
    link_token: input.linkToken,
    decimals: input.decimals,
    description: input.description,
    max_answer: input.maxAnswer,
    min_answer: input.minAnswer,
  }
}

const validateInput = (input: CommandInput): boolean => {
  return true
}

const deployInstruction: AbstractInstruction<CommandInput, ContractInput> = {
  instruction: {
    contract: 'ocr2',
    function: 'deploy',
  },
  makeInput: makeCommandInput,
  validateInput: validateInput,
  makeContractInput: makeContractInput,
}

export default instructionToCommand(deployInstruction)
