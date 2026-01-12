import itemsData from '../data/items_with_groups.json';

function seededRng(seed) {
    let t = seed >>> 0;
    return function () {
        t += 0x6D2B79F5;
        let r = Math.imul(t ^ (t >>> 15), 1 | t);
        r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
}

function shuffle(array, rng) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function sampleKDistinct(array, k, rng) {
    const copy = array.slice();
    shuffle(copy, rng);
    return copy.slice(0, k);
}

// Try to assign 4 unique items per group such that each chosen item's
// value does NOT appear in any of the other selected groups. This
// enforces per-group exclusivity by taking the set-difference of each
// group's items with the union of the other groups. If any group has
// fewer than 4 exclusive items the combination is rejected.
function tryAssign(groups, rng = Math.random) {
    const groupItems = groups.map((g) => Array.from(new Set(g.items)));

    // For each group, compute allowed = group \\ union(other groups)
    const allowedPerGroup = [];
    for (let gi = 0; gi < groups.length; gi++) {
        const othersUnion = new Set();
        for (let gj = 0; gj < groups.length; gj++) {
            if (gi === gj) continue;
            for (const it of groupItems[gj]) othersUnion.add(it);
        }
        const allowed = groupItems[gi].filter((it) => !othersUnion.has(it));
        if (allowed.length < 4) return null; // not enough exclusive items for this group
        allowedPerGroup.push(allowed);
    }

    // Select 4 items from each allowed set (use RNG to vary choices)
    const res = {};
    for (let gi = 0; gi < groups.length; gi++) {
        const pick = sampleKDistinct(allowedPerGroup[gi], 4, rng);
        res[groups[gi].Name || groups[gi].key || `group${gi}`] = pick;
    }

    return res;
}

/**
 * Generate a puzzle: 4 groups, 4 unique items each, no item repeats across groups.
 * If `seed` is provided the selection is deterministic.
 */
export default function generatePuzzle({ seed } = {}) {
    const rng = seed != null ? seededRng(Number(seed)) : Math.random;

    const allGroupKeys = Object.keys(itemsData || {});
    if (allGroupKeys.length < 4) throw new Error('Not enough groups to generate a puzzle');

    // Prepare group objects with items and display name
    const groups = allGroupKeys.map((k) => ({ key: k, Name: itemsData[k].Name || k, items: itemsData[k].items || itemsData[k].Items || [] }));

    const maxRandomAttempts = 2000;
    for (let attempt = 0; attempt < maxRandomAttempts; attempt++) {
        const chosen = sampleKDistinct(groups, 4, rng);
        const assigned = tryAssign(chosen, rng);
        if (assigned) return assigned;
    }

    // If random attempts failed, try all combinations (deterministic)
    // Generate all combinations of 4 groups (small n expected)
    const n = groups.length;
    const combos = [];
    for (let a = 0; a < n - 3; a++) {
        for (let b = a + 1; b < n - 2; b++) {
            for (let c = b + 1; c < n - 1; c++) {
                for (let d = c + 1; d < n; d++) {
                    combos.push([groups[a], groups[b], groups[c], groups[d]]);
                }
            }
        }
    }

    // Shuffle combination order slightly for nondeterminism using the same RNG
    shuffle(combos, rng);
    for (const combo of combos) {
        const assigned = tryAssign(combo, rng);
        if (assigned) return assigned;
    }

    throw new Error('Unable to generate puzzle with the current groups/items.');
}