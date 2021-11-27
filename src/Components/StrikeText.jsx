

const StrikeText=(props)=>{
    const styles={
        textDecoration: 'line-through',
    }

    if(props.val===0){
        return <span style={styles}>{props.text}</span>
    }
    else{
        return <span>{props.text}</span>
    }
}

export default StrikeText;