import items from '../data/items.json';
import generatePuzzle from './generatePuzzle';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default function generateGridData() {
    // `generatePuzzle` may return an array or an object of groups. Normalize
    // into an array where each group has an `id` (number or string), `name`,
    // and `items` array.
    const rawGroups = generatePuzzle();

    const groupsArray = Array.isArray(rawGroups)
        ? rawGroups
        : Object.entries(rawGroups || {}).map(([key, val]) => {
              if (val && typeof val === 'object') {
                  const id = typeof val.id !== 'undefined' ? val.id : (isNaN(Number(key)) ? key : Number(key));
                  return { id, ...val };
              }
              const id = isNaN(Number(key)) ? key : Number(key);
              return { id, name: `Group ${key}`, items: [] };
          });

    const normalizedGroups = groupsArray.map((group, idx) => {
        let itemList = [];
        for (let i=0; i<4; i++){
            itemList.push(group[i])
        }
        return {id: idx, name: group.id, items: itemList};
    })

    let gridItems = [];

    normalizedGroups.forEach((group) => {
        group.items.forEach((itemId) => {
            const itemData = items[itemId];
            if (itemData) {
                gridItems.push({
                    id: itemId,
                    name: itemId,
                    imageUrl: itemData.image})
            }
        });
    });

    gridItems = shuffleArray(gridItems);
    
    console.log('Normalized groups:', normalizedGroups);
    console.log('Final grid items:', gridItems);
    return { gridItems, groups: normalizedGroups };
}