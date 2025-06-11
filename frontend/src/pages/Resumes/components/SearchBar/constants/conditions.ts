export enum Condition {
    ALL = 'ALL',
    ONLY_MINE = 'ONLY_MINE',
    FAVORITES = 'FAVORITES',
}

export const conditions = [
    {
        value: Condition.ALL,
        label: 'Все',
    },
    {
        value: Condition.ONLY_MINE,
        label: 'Только мои',
    },
    {
        value: Condition.FAVORITES,
        label: 'Избранное',
    },
]
