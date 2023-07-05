const ALIGNMENT = [
    {value: 'MAFIA', name: 'Mafia'},
    {value: 'VILLAGE', name: 'Village'},
    {value: 'SOLO', name: 'Solo'}
]

const AURA = [
    {value: 'EVIT', name: 'Evil'},
    {value: 'GOOD', name: 'Good'}, 
    {value: 'UNKNOWN', name: 'Unknown'}
]
const WIN_CONDITION = [
    {value: 'TARGET_ELIMINATED', name: 'Target eliminated'},
    {value: 'IS_LYNCHED', name: 'Lynched by village'},
    {value: 'NUMERICAL_PARITY', name: 'Numerical parity with other parties'},
    {value: 'ZERO_ENEMIES', name: 'No enemies left'}
]

const CATEGORY = [
    {value: 'INVESTIGATIVE', name: 'Investigative'},
    {value: 'WATCHING', name: 'Watching'},
    {value: 'PROTECTION', name: 'Protection'},
    {value: 'BLOCKING', name: 'Blocking'},
    {value: 'LYING', name: 'Lying'},
    {value: 'VOTING', name: 'Voting'},
    {value: 'KILLER', name: 'Killer'},
    {value: 'OTHER', name: 'Other'},
    {value: 'VILLAGER', name: 'Villager'}
]

const ACTION = [
    {value: null, name: 'Null'},
    {value: 'KILL', name: 'Kill'},    
    {value: 'SHOOT', name: 'Shoot'},
    {value: 'STAB', name: 'Stab'},
    {value: 'EAT', name: 'Eat'},
    {value: 'BURN', name: 'Burn'},
    {value: 'PROTECT', name: 'Protect'},
    {value: 'REVIVE', name: 'Revive'},
    {value: 'SILENCE', name: 'Silence'},
    {value: 'INVESTIGATE_ROLE', name: 'Investigate role'},
    {value: 'INVESTIGATE_COMPARE', name: 'Investigate compare'},
    {value: 'INVESTIGATE_AURA', name: 'Investigate aura'},
    {value: 'VISIT_GOOD_BAD', name: 'visitGoodBad'},
    {value: 'REVEAL', name: 'Reveal'},
    {value: 'PRIME', name: 'Prime'},
    {value: 'MAFIA_VOTE', name: 'Mafia vote'},
    {value: 'REVEAL_SELF', name: 'Reveal self'},
    {value: 'BLOCK_ACTION', name: 'Block action'}
]

const USER_TYPES = ref([
    { text: '0 - Banned user', value: 0 },
    { text: '1 - User with an account', value: 1 },
    { text: '2 - Premium user', value: 2 },
    { text: '3 - Admin', value: 3 },
    { text: '4 - Super admin', value: 4 },
]);

export default function useDropdowns() {
    return {
        ALIGNMENT,
        AURA,
        WIN_CONDITION,
        CATEGORY,
        ACTION,
        USER_TYPES
    }
}