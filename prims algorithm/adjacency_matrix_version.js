"use strict";
const inquirer=require('inquirer')
let V;

// A utility function to find the vertex with  
// minimum key value, from the set of vertices  
// not yet included in MST 
function minKey(key,mstSet) 
{ 
    // Initialize min value 
    let min = Number.MAX_VALUE, min_index;  
    for (let v = 0; v < V; v++) 
        if (mstSet[v] == false && key[v] < min) 
            min = key[v], min_index = v; 
  
    return min_index; 
} 

// A utility function to print the  
// constructed MST stored in parent[] 
function printMST(parent,n,graph) 
{ 
    console.log("Minimum spanning tree is following:")
    console.log("Edge  | Weight"); 
    for (let i = 1; i < V; i++) 
        console.log( parent[i]+" -" ,i,"|  "+ graph[i][parent[i]]); 
} 

function primMST(graph){
    // Array to store constructed MST 
    let parent=[];  
    // Key values used to pick minimum weight edge in cut 
    let key=[];  
    // To represent set of vertices not yet included in MST 
    let mstSet=[];  
    // Initialize all keys as INFINITE 
    for (let i = 0; i < V; i++) 
        key[i] = Number.MAX_VALUE, mstSet[i] = false; 
  
    // Always include first 1st vertex in MST. 
    // Make key 0 so that this vertex is picked as first vertex. 
    key[0] = 0;      
    parent[0] = -1; // First node is always root of MST  
  
    // The MST will have V vertices 
    for (let count = 0; count < V-1; count++) 
    { 
        // Pick the minimum key vertex from the  
        // set of vertices not yet included in MST 
        let u = minKey(key, mstSet); 
  
        // Add the picked vertex to the MST Set 
        mstSet[u] = true; 
  
        // Update key value and parent index of  
        // the adjacent vertices of the picked vertex.  
        // Consider only those vertices which are not  
        // yet included in MST 
        for (let v = 0; v < V; v++) 
  
        // graph[u][v] is non zero only for adjacent vertices of m 
        // mstSet[v] is false for vertices not yet included in MST 
        // Update the key only if graph[u][v] is smaller than key[v] 
        if (graph[u][v] && mstSet[v] == false && graph[u][v] < key[v]) 
            parent[v] = u, key[v] = graph[u][v]; 
    } 
  
    // print the constructed MST 
    printMST(parent, V, graph);
}

function test(){
    //let stdin = process.openStdin();
    // stdin.addListener("data", function(d) {
    //     // note:  d is an object, and when converted to a string it will
    //     // end with a linefeed.  so we (rather crudely) account for that  
    //     // with toString() and then trim()
    //     console.log(typeof d)
    //     console.log(d[0]) 
    //     console.log("you entered: [" + 
    //         d.toString().trim() + "]");
        
    // });
    let graph=[];
    var questions = [{
        type: 'input',
        name: 'vertices',
        message: "Provide the no of vertices?",
      },
      {
        type: 'input',
        name: 'graph',
        message: "Input your graph adjacency matrix(row-by-row fashion) without any space or newline",
      }]
      inquirer.prompt(questions).then(answers => {
        if(answers.vertices) 
            V=answers.vertices
        for(let i=0;i<parseInt(answers['vertices']);i++)
        {   graph[i]=[]
            for(let j=0;j<parseInt(answers['vertices']);j++)
            {
             
                graph[i].push(parseInt(answers['graph'][i*parseInt(answers['vertices'])+j]))
                
            }
        }
        console.log(graph) 
        primMST(graph); 
      })
      
    
}

// Running the test function to calculate MST(Minimum spanning tree)
test();