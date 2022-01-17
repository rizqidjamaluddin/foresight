

export const timeToSec = function(input: string) {
    return (+input.split(':')[0] * 60) + +input.split(':')[1]
}
