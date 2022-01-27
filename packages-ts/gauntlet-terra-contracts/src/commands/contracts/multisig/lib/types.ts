type GroupMember = {
  addr: string,
  weight: number
}

type Duration = {
  height?: number,   // block height
  time?: number     // length of time in seconds
}

function validDuration(d: Duration): boolean {
  if ((typeof d.height === number) && (typeof d.time) === undefined) {
    return d.height >= 0
  } else if ((typeof d.height === undefined) && (typeof d.time) === number) {
    return d.time >= 0
  } else {
    return false // must have either height or time, but not both
  }
}

type AbsCount = {
  weight: number
}

type AbsPerc = {
  percentage: number
}

type ThreshQuorum = {
  threshold : number,
  quorum : number
}

type Threshold = {
  absolute_count? : AbsCount,
  absolute_percentage? : AbsPerc,
  threshold_quorum? : ThreshQuorum
}

function validThreshold(t: Threshold): boolean {
  // TODO
  return true
}

export { GroupMember, Duration, validDuration, Threshold, validThreshold }
