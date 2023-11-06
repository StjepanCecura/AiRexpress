import { useEffect, useState } from "react"
import { Customer } from "../types/customer.type"
import axios from "axios"
import { API_URL } from "../constants"
import Spinner from "../components/Spinner"
import Button from "../components/Button"
const Profile = () => {
  const [customer, setCustomer] = useState<Customer>({ name: "", email: "" })
  const [loadingStack, setLoadingStack] = useState<number[]>([])

  const startLoading = () => {
    setLoadingStack((prev) => [...prev, 1])
  }

  const stopLoading = () => {
    setLoadingStack((prev) => prev.slice(0, -1))
  }

  const getCustomerData = async () => {
    startLoading()
    await axios
      .get(`${API_URL}/customer`)
      .then((res) => {
        console.log("RES -> ", res)
      })
      .catch((err) => {
        console.log("ERROR -> ", err)
      })
      .finally(() => {
        stopLoading()
      })
  }

  const signOut = async () => {
    console.log("Signing out!")
  }

  const handleSignOutClick = () => {
    signOut()
  }

  useEffect(() => {
    getCustomerData()
    return () => {}
  }, [])

  if (loadingStack.length > 0) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <p>Hello, {customer.name}!</p>
      <p>Email: {customer.email}</p>
      <Button text="Sign Out" onClick={handleSignOutClick} />
    </div>
  )
}

export default Profile
