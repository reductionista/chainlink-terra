import { CATEGORIES } from '../../../lib/constants'
import { AbstractInstruction, instructionToCommand } from '../../abstract/wrapper'
import { GroupMember } from './lib/types'

type CreateGroupInput = {
  members : string[],
  weights : number[],
  admin?: string
}

type GroupInitParams = {
  members: GroupMember[],
  admin?: string
}

const makeCreateGroupInput = async (flags: any): Promise<CreateGroupInput> => {
  console.log(typeof(flags.members))
  console.log(typeof(flags.admin))
  console.log(flags)
  if (flags.input)
    return flags.input as CreateGroupInput

  return {
    members: flags.members,
    weights: flags.weights,
    admin: flags.admin
  }
}

// TODO: Add validation
const validateCreateGroupInput = (input: CreateGroupInput): boolean => {
  console.log(typeof(input.members))
  console.log(typeof(input.admin))
  return true
}

const makeGroupInitParams = async (input : CreateGroupInput): Promise<GroupInitParams> => {
  return {
    members: input.members.map((a, i) => ({
        addr: a,
        weight: input.weights[i]
      })
    ),
    admin: input.admin
  }
}

type CreateWalletInput = {
  owners: string[],
  threshold: number
}

type WalletInitParams = {
  owners: string[],
  threshold: number
}

const makeCreateWalletInput = async (flags: any): Promise<CreateWalletInput> => {
  if (flags.input) return flags.input as CreateWalletInput
  return {
    owners: flags.owners,
    threshold: flags.threshold
  }
}

// TODO: Add validation
const validateCreateWalletInput = (input: CreateWalletInput): boolean => {
  return true
}

const makeWalletInitParams = async (input: CreateWalletInput): Promise<WalletInitParams> => {
  return {
    owners: input.owners,
    threshold: input.threshold    
  }
}

const createGroupInstruction:  AbstractInstruction<CreateGroupInput, GroupInitParams> = {
  instruction: {
    category: CATEGORIES.MULTISIG,
    contract: 'cw4_group',
    function: 'deploy'
  },
  makeInput: makeCreateGroupInput,
  validateInput: validateCreateGroupInput,
  makeContractInput: makeGroupInitParams
}

// Creates a multisig wallet backed by a previously created cw4_group
const createWalletInstruction: AbstractInstruction<CreateWalletInput, WalletInitParams> = {
  instruction: {
    category: CATEGORIES.MULTISIG,
    contract: 'cw3_flex_multisig',
    function: 'deploy'
  },
  makeInput: makeCreateWalletInput,
  validateInput: validateCreateWalletInput,
  makeContractInput: makeWalletInitParams
}

export const CreateGroup = instructionToCommand(createGroupInstruction)
export const CreateWallet = instructionToCommand(createWalletInstruction)
