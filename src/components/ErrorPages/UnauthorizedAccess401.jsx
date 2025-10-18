const Figure_SRC = '/Error_401.png'

const UnauthorizedAccess401 = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <img 
                src={Figure_SRC} 
                alt="401_Error" 
                className="h-screen w-auto" 
            />
        </div>
    )
}

export default UnauthorizedAccess401;
