export function PriorityQueue(){
    let items = [];
    
    //Container
    function QueueElement(element, priority){
      this.element = element;
      this.priority = priority;
    }
    
    //Add a new element in queue
    this.enqueue = function(element, priority){
      let queueElement = new QueueElement(element, priority);
      
      //To check if element is added
      let added = false;
      for(let i = 0; i < items.length; i++){
        //We are using giving priority to higher numbers
        //If new element has more priority then add it at that place
        if(queueElement.priority < items[i].priority){
          items.splice(i, 0, queueElement);
          
          //Mark the flag true
          added = true;
          break;
        }
      }
      
      //If element is not added
      //Then add it to the end of the queue
      if(!added){
        items.push(queueElement);
      }
    }
    
    //Remove element from the queue
    this.dequeue = () => {
      return items.shift();
    }
    
    //Return the first element from the queue
    this.front = () => {
      return items[0];
    }
    
    //Return the last element from the queue
    this.rear = () => {
      return items[items.length - 1];
    }
    
    //Check if queue is empty
    this.isEmpty = () => {
      return items.length == 0;
    }
    
    //Return the size of the queue
    this.size = () => {
     return items.length;
    }
    
    //Print the queue
    this.print = function(){
      for(let i = 0; i < items.length; i++){
        console.log(items[i].element);
        console.log(` - ${items[i].priority}`);
      }
    }
  }

let vv = new PriorityQueue()

vv.enqueue("hi",2);
vv.enqueue('Hell0',1);

vv.print()