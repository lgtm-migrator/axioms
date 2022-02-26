import { sep } from 'path'

/// or just backwards? ;)
const isBackwardSlash = sep === '\\'

export function fixPath(path: string, { fix = isBackwardSlash }: { fix?: boolean } = {}): string {
    return fix ? path.replace(/\\/g, '/') : path
}
