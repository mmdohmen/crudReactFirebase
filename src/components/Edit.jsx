import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"
import { async } from "@firebase/util"

const Edit = () => {

    const [description, setDescription] = useState("")
    const [stock, setStock] = useState(0)
    const navigate = useNavigate()
    const {id} = useParams()

    // BUSCAR o TRAER documento
    const getProductById = async (id) => {
        // documento
        const product = await getDoc(doc(db,"products",id))
        // validacion
        if (product.exists()) {
            setDescription(product.data().description)
            setStock(product.data().stock)
        } else {
            console.log("el PRODUCTO NO EXISTE ...")
        }
    } 

    // aplico los datos obtenidos
    useEffect( () => {getProductById(id)}, [] )

    // ACTUALIZAR documento
    const update = async (e) => {
        e.preventDefault()   // cancels the event if it is cancelable, 
                             // meaning that the default action that belongs to the event will not occur
        
        // doc(firestore: Firestore, path: string, ...pathSegments: string[]): DocumentReference<DocumentData>
        const product = doc(db, "products", id)
        // valores nuevos
        const data = {
            description: description,
            stock: stock
        }
        // actualizo el documento con los nuevos valores
        await updateDoc(product,data)
        // vuelvo al componente q muestra los documentos de la BBDD
        navigate("/")
    }

    // interface
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>UPDATE Product</h1>
                    <form onSubmit={update}>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Stock</label>
                            <input type="number" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)}/>
                        </div>
                        <button type="submit" className="btn btn-primary">UPDATE</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Edit
