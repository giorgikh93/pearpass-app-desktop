type VaultRecord = {
    id: string
    type: string
    isFavorite?: boolean
    data?: {
        title?: string
        username?: string
        email?: string
        websites?: Array<string | { website?: string | undefined }>
        [key: string]: unknown
    }
    folder?: string | null
}

export type { VaultRecord }