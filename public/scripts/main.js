// client side script

const hamburgerButton = document.querySelector('.fa-bars')


hamburgerButton.addEventListener('click',e=>{
    e.preventDefault()
    const linksContainer = document.getElementById('navigation-links-container')
    const outerContainer = document.getElementById('navigation-outer-container')
    if(linksContainer.style.display === 'none'){
        linksContainer.style.display = 'block';
        linksContainer.style.animation
        return;
    }
    linksContainer.style.display = 'none';
    outerContainer.style.display = 'flex';
    outerContainer.style.justifyContent = 'flex-end';
    return;

    console.log("BURGER CLICKED")
})

// generates random number between 0 -100
function getRandomNumber(){
    let randomNumber = Math.floor(Math.random()*400);
    return randomNumber;
}

// removes all child nodes within parent element if they exist
function removeAllChildNodes(parentElement){
    const numberOfChildElements = parentElement.childElementCount; 
    if(numberOfChildElements === 0) return;
    console.log(numberOfChildElements)
    for(let i =0; i<numberOfChildElements; i++){
        parentElement.removeChild(parentElement.lastElementChild) // removes node from parent element
    }
    return;
}

const genArrayBtn = document.getElementById('gen-array-btn-2')

genArrayBtn.addEventListener('click',e=>{
    e.preventDefault()
    const numberSet = new Set() // empty set to store already generated random numbers
    const numberArray = []
    let counter =0;
    while(counter<20){
        const genNumber = getRandomNumber(); 
        if (numberSet.has(genNumber) || genNumber<10) continue; // continue if number already exists in set and returns true boolean
        // adds random generated number to array and set 
        numberArray.push(genNumber);
        numberSet.add(genNumber);
        counter+=1;
    }
    sortButton.array = numberArray;
    const arrayArea = document.querySelector('.array-area')
    removeAllChildNodes(arrayArea);
    console.log(`Number of child elements ${arrayArea.childElementCount}`)
    for(const number of numberArray){
        let div = document.createElement('div')
        div.style.width ='25px';
        div.style.height = `${number}px`;
        div.style.backgroundColor ='black';
        div.style.marginRight = '16px'
        arrayArea.appendChild(div)
    }
    console.log(arrayArea)
    // for(const number of numberArray){

    // }
    console.log(numberArray)
    console.log(`Array is length is ${numberArray.length}`)
})


const links = document.querySelectorAll('.sort-links')
const sortButton = document.getElementById('sort-array-btn-1')
console.log(sortButton)

for(const link of links){
    link.addEventListener('click',e=>{
        e.preventDefault()

        if(link.style.color === 'red'){
            console.log("CHANGE TO BLACK")
            sortButton.value = null
            link.style.color = 'black';
            return;
        }
        console.log("CHANGE TO RED")
        link.style.color = 'red';
        sortButton.value = link.innerHTML
        console.log(sortButton.value)
        return;
    })
}

sortButton.addEventListener('click',async e=>{
    // console.log(`Sort array using ${sortButton.value || null} algorithim`)
    console.log(`Array is ${sortButton.array}`)
    if(sortButton.value == null || !sortButton.array) return;
    if(sortButton.value === 'Bubble sort')  await bubbleSort(sortButton.array);
     if(sortButton.value === 'Selection sort') await selectionSort(sortButton.array);
    if(sortButton.value === 'Insertion sort') await insertionSort(sortButton.array);
    if(sortButton.value === 'Quick sort') await quickSort(sortButton.array);
    if(sortButton.value === 'Quick Select sort') return;
    if(sortButton.value === 'Merge sort') return;
    if(sortButton.value === 'Count sort') return;

})

function dynamicArrayRender(numberArray){
    const arrayArea = document.querySelector('.array-area')
    removeAllChildNodes(arrayArea); // removes nodes if exists in parent element

    for(const number of numberArray){
        let div = document.createElement('div')
        div.style.width ='25px';
        div.style.height = `${number}px`;
        div.style.backgroundColor ='black';
        div.style.marginRight = '16px'
        arrayArea.appendChild(div)
    }
}

const delay = (ms) => new Promise(r => setTimeout(r, ms)) // delay method, takes in ms delay and returns promise

async function bubbleSort(unOrderedArray){
    for(let i =1; i<=unOrderedArray.length-1; i++){ // 
        flag = false // flag representing if flag has been changed or not
        for(let j =0; j<=unOrderedArray.length-i-1; j++){
            if(unOrderedArray[j]>unOrderedArray[j+1]){
                flag = true;
                let temp = unOrderedArray[j] // temporariy stores larges number
                unOrderedArray[j] = unOrderedArray[j+1] // swaps numbers
                unOrderedArray[j+1] = temp; 
                dynamicArrayRender(unOrderedArray)
                await delay(1000);
            }
    
        }
        if(flag === false) break; // breaks loop if no swaps were made meaning flag state was not changed to true
    
    }
    return unOrderedArray;
    
}

async function selectionSort(array){
    for(let i = 0; i<array.length; i++){
        let curr = i; // set current to this array
        let min = i
        for(let j = i+1; j<array.length; j++){
            if(array[j]<array[min]){
                min = j; // minimum index changed   
            }
        }
        // swap if current is not equal to the minimum
        if(curr!=min){
            let temp = array[curr];
            array[i] = array[min];
            array[min] = temp;
            dynamicArrayRender(array)
            await delay(1000);

        }
    }
    return array;
}

async function insertionSort(array){
    for(let i = 0; i<array.length; i++){ // iterates through each element index of iterable
        let curr = i;
        let val = array[i];
        for(let j = i-1; j>-1; j--){ // iterates backwards from original index 
            if(array[j]>array[j+1]){ //triggers if block to compare previous and adjecent element
                // swap block
                let temp = array[j];
                array[j] = array[j+1]; 
                array[j+1] = temp;
                dynamicArrayRender(array)
                await delay(1000);
            }
        }
    }
    return array;
}



async function quickSort(items) {
    return await quickSortHelper(items, 0, items.length-1);
}


async function quickSortHelper(items, left, right) {
    var index;
    if (items.length > 1) {
        index = await partition(items, left, right);
    if (left < index - 1) { 
        quickSortHelper(items, left, index - 1);
        }
   
    if (index < right) {
        quickSortHelper(items, index, right);
    }
    }
    return items;
}

async function partition(array, left, right) {
    var pivot = array[Math.floor((right + left) / 2)];
    while (left <= right) {
        while (pivot > array[left]) {
        left++;
        }
        while (pivot < array[right]) {
            right--;
        }
        if (left <= right) {
            var temp = array[left];
            array[left] = array[right];
            array[right]= temp;
            dynamicArrayRender(array)
            await delay(1000)
            left++;
            right--;
        }
    }
    return left;
}

