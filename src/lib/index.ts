
export function parseFirstInt(str: string) {
    // Use regex to find the first sequence of digits
    const match = str.match(/\d+/);
    
    // If a match is found, convert it to a number, otherwise return null
    return match ? parseInt(match[0], 10) : null;
}

export type CubeSize = `h-${number}` | `w-${number}`;