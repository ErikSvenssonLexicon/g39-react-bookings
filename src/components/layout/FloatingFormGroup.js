
const FloatingFormGroup = (props) =>{
    return (
        <div className={`form-floating ${props.className}`}>
            {props.children}
        </div>
    )
}

export default FloatingFormGroup;