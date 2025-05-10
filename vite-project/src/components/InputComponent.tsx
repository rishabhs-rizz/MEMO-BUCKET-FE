
interface Attributes {
    Placeholder: string;
    reference?: any
}


export function Input({Placeholder, reference}: Attributes){
    return <div>
        <input ref={reference} placeholder={Placeholder} type="text" className="px-4 py-2 border rounded m-2"/>
    </div>
}