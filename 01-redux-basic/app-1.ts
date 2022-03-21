// Acciones
interface Action {
    type: string;
    payload?: any;
}



function reducer( state = 10 , action: Action ){
    
    if (action.type === "INCREMENTAR"){
        return state += 1;
    }
    return state;
}

//User el reducer
const incrementadorAction: Action = {
    type: "INCREMENTAR"
}
console.log(reducer(10, incrementadorAction))