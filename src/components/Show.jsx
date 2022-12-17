import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Firebase
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase.js"
// SweetAlert2
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { async } from "@firebase/util";


const MySwal = withReactContent(Swal)

const Show  = () => {
// 1- configurar los HOOKS
const [products, setProducts] = useState ([])
// 2- referencio la BBDD de firestore
const productCollection = collection(db, "products")
// 3- funcion p/ MOSTRAR los documentos
const getProducts = async () => {
    const data = await getDocs (productCollection)
    console.log(data.docs)
    setProducts(
        data.docs.map( (doc) => ({...doc.data(), id:doc.id}) )
    )
    console.log(products)
}
// 4- funcion p/ ELIMINAR documentos/registros
const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id)
    await deleteDoc(productDoc)
    getProducts()
}
// 5- funcion p/ CONFIRMAR con SweetAlert2
const confirmDelete = (id) => {
    Swal.fire({
        title: 'Are you SURE ?...',
        text: "You WON'T be able to REVERT this!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, DELETE it!'
      }).then((result) => {
        if (result.isConfirmed) {
            deleteProduct(id)
          Swal.fire(
            'Deleted !!! ...',
            'Your FILE has been TERMINATED ...',
            'success'
          )
        }
      })
}
// 6- uso de useEffect
useEffect( () => { getProducts() }, [])
// 7- funcion p/ MOSTRAR un componente
return(
    // fragment:   https://es.reactjs.org/docs/fragments.html
    <>
    <div className="container">
        <div className="row">
            <div className="col">
                <div className="d-grid gap-2">
                    <Link to="/create" className="btn btn-info mt-2 mb-2">CREAR</Link>
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>description</th>
                                <th>stock</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map( (product) => (
                                <tr key={product.id}>
                                    <td>{product.description}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        <Link to={`/edit/${product.id}`} className="btn btn-link"><i className="fa-solid fa-pencil"></i></Link>
                                        <button onClick={() => {confirmDelete(product.id)}} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    </>
)
}

export default Show
