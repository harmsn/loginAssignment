const profile = (state = [], action) => {
    switch (action.type) {
      case 'ADD_PROFILE':
        return  { profile: action.obj } 
        
      default:
        return state
    }
  }
  
export default profile