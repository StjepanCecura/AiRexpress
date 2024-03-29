import { Link } from "react-router-dom"
import MenuSVG from "../assets/menu.svg"
import ProfileSVG from "../assets/profile.svg"
import CartSVG from "../assets/shopping-cart.svg"
import CartActiveSVG from "../assets/shopping-cart-active.svg"
import MenuCloseSVG from "../assets/menu-close.svg"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getLoginStatus } from "../services/lsLoginStatus"
import { useLocation } from "react-router-dom"
import { API_URL } from "../constants"
import axios from "axios"
import { toast } from "react-toastify"
import { IRoute } from "../interfaces/route.interface"
import LogoPNG from "../assets/air-express-logo.png"
import { CartContext } from "../services/CartContext"
import { useContext } from "react"
import { getShoppingCart } from "../services/lsShoppingCart"
import SupportSVG from "../assets/support.svg"
interface Props {
  loginStatus: string
  handleSignOutClick: () => void
  handleProfileClick: () => void
  handleSignInClick: () => void
  handleCartClick: () => void
  handleSupportClick: () => void
  routes: any
  cartExists: boolean
}

const NavbarDesktop = ({
  loginStatus,
  handleSignOutClick,
  handleProfileClick,
  handleSignInClick,
  handleCartClick,
  handleSupportClick,
  routes,
  cartExists,
}: Props) => {
  return (
    <div className="hidden lg:flex flex-row px-10 py-3">
      <div className="flex flex-row flex-1 gap-6">
        <Link to="/" className="flex justify-center items-center">
          {/* <span className="text-primary">AiR</span>Express */}
          <img src={LogoPNG} alt="logo" width={100} />
        </Link>
        <Link to="/">Home</Link>
        {routes.map((route: IRoute) => {
          if ((route.title ?? "") === "") return
          return (
            <Link key={route.title} to={route.slug}>
              {route.title}
            </Link>
          )
        })}
      </div>
      <div className="flex flex-row items-center gap-6">
        {loginStatus ? (
          <img
            src={SupportSVG}
            className="h-7 hover:cursor-pointer"
            onClick={handleSupportClick}
          />
        ) : null}
        {cartExists ? (
          <img
            src={CartActiveSVG}
            className="h-6 hover:cursor-pointer"
            onClick={handleCartClick}
          />
        ) : (
          <img
            src={CartSVG}
            className="h-6 hover:cursor-pointer"
            onClick={handleCartClick}
          />
        )}

        <img
          src={ProfileSVG}
          className="h-7 hover:cursor-pointer"
          onClick={handleProfileClick}
        />
        {loginStatus == "true" ? (
          <p
            className="text-primary hover:cursor-pointer"
            onClick={handleSignOutClick}
          >
            Sign Out
          </p>
        ) : (
          <p
            className="text-primary hover:cursor-pointer"
            onClick={handleSignInClick}
          >
            Sign In
          </p>
        )}
      </div>
    </div>
  )
}

const NavbarMobile = ({
  loginStatus,
  handleSignOutClick,
  handleProfileClick,
  handleSignInClick,
  handleCartClick,
  handleSupportClick,
  routes,
  cartExists,
}: Props) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const handleMenuClick = () => {
    setMenuOpen((prevstate) => !prevstate)
  }

  return (
    <>
      <div className="lg:hidden flex flex-row px-2 py-3">
        <div className="flex flex-row flex-1 gap-6">
          <Link to="/" className="flex justify-center items-center">
            {/* <span className="text-primary">AiR</span>Express */}
            <img src={LogoPNG} alt="logo" width={100} />
          </Link>
        </div>
        <div className="flex flex-row gap-6 items-center">
          {loginStatus ? (
            <img
              src={SupportSVG}
              className="h-7 hover:cursor-pointer"
              onClick={handleSupportClick}
            />
          ) : null}
          {cartExists ? (
            <img
              src={CartActiveSVG}
              className="h-6 hover:cursor-pointer"
              onClick={handleCartClick}
            />
          ) : (
            <img
              src={CartSVG}
              className="h-6 hover:cursor-pointer"
              onClick={handleCartClick}
            />
          )}
          <img
            src={ProfileSVG}
            className="h-7 hover:cursor-pointer"
            onClick={handleProfileClick}
          />
          {menuOpen ? (
            <img
              src={MenuCloseSVG}
              className="w-5 ml-1 hover:cursor-pointer"
              onClick={handleMenuClick}
            />
          ) : (
            <img
              src={MenuSVG}
              className="h-4 hover:cursor-pointer"
              onClick={handleMenuClick}
            />
          )}
        </div>
      </div>
      {menuOpen ? (
        <div className="flex flex-col mb-4">
          <div className="border-b-primary border">
            <Link to="/">
              <p className="p-2">Home</p>
            </Link>
          </div>
          {routes.map((route: IRoute) => {
            if ((route.title ?? "") === "") return
            return (
              <div key={route.title} className="border-b-primary border">
                <Link to={route.slug}>
                  <p className="p-2">{route.title}</p>
                </Link>
              </div>
            )
          })}

          {loginStatus == "true" ? (
            <div className=" border-b-primary border">
              <p
                className="text-primary hover:cursor-pointer p-0"
                onClick={handleSignOutClick}
              >
                Sign Out
              </p>
            </div>
          ) : (
            <div className="p-2 border-b-primary border">
              <p
                className="text-primary hover:cursor-pointer p-0"
                onClick={handleSignInClick}
              >
                Sign In
              </p>
            </div>
          )}
        </div>
      ) : null}
    </>
  )
}

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [loginStatus, setLoginStatus] = useState("")
  const [routes, setRoutes] = useState([{}])
  const [isLoading, setIsLoading] = useState(false)
  const [cartExists, setCartExists] = useState(false)

  const { cartContextState } = useContext(CartContext)

  const signOut = async () => {
    await axios
      .get(`${API_URL}/customer/sign-out`)
      .then((res) => {})
      .catch((err) => {
        if (err?.response?.status != 403) {
          toast.error("Error signing out. Please try again later.")
        }
      })
  }

  const handleProfileClick = () => {
    navigate("/profile")
  }

  const handleSignOutClick = () => {
    signOut()
  }

  const handleSignInClick = () => {
    navigate("/login")
  }

  const handleCartClick = () => {
    navigate("/shopping-cart")
  }

  const handleSupportClick = () => {
    navigate("/customer-support")
  }

  const getNavigationEntries = async () => {
    setIsLoading(true)
    await axios
      .get(`${API_URL}/product/getNavigationEntries`)
      .then((res) => {
        const routesFromContentful = res.data.map((route: IRoute) => {
          let modifiedSlug = ""
          if (route.type === "category") modifiedSlug = `/c/${route.slug}`
          if (route.type === "none") modifiedSlug = `/${route.slug}`
          return {
            title: route.title,
            slug: modifiedSlug,
          }
        })
        setRoutes(routesFromContentful)
      })
      .catch((err) => {
        console.log("ERROR -> ", err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const getCartByCartId = async (cartId: string) => {
    await axios
      .get(`${API_URL}/receipts/getCartById?cartId=${cartId}`)
      .then((res) => {
        if (res?.data?.products.length > 0) {
          setCartExists(true)
        } else {
          setCartExists(false)
        }
      })
      .catch((err) => {
        console.log("ERROR -> ", err)
        setCartExists(false)
      })
  }

  const getCartIdByUser = async () => {
    let id: string | null
    await axios
      .get(`${API_URL}/receipts/getCartByCustomerId`)
      .then((res) => {
        id = res?.data?.cartId
      })
      .catch((err) => {
        console.log("ERROR -> ", err)
        id = null
      })
    return id
  }

  const checkShoppingCart = async () => {
    if (loginStatus == null) {
      // User is not logged in, check cart in LS
      const cartIdFromLS = getShoppingCart()
      if (cartIdFromLS != null) {
        getCartByCartId(cartIdFromLS)
      }
    }
    if (loginStatus == "true") {
      // User is logged in, get cart for user
      const cartIdByUser = await getCartIdByUser()
      if ((cartIdByUser ?? "") != "") {
        getCartByCartId(cartIdByUser)
      }
    }
  }

  useEffect(() => {
    getNavigationEntries()
    return () => {}
  }, [])

  useEffect(() => {
    checkShoppingCart()
    return () => {}
  }, [loginStatus])

  useEffect(() => {
    if (cartContextState != null && cartContextState != undefined) {
      setCartExists(cartContextState)
    }
    return () => {}
  }, [cartContextState])

  useEffect(() => {
    const status = getLoginStatus()
    setLoginStatus(status)
    return () => {}
  }, [location])

  if (isLoading) return null

  return (
    <>
      <NavbarDesktop
        loginStatus={loginStatus}
        handleSupportClick={handleSupportClick}
        handleProfileClick={handleProfileClick}
        handleSignOutClick={handleSignOutClick}
        handleSignInClick={handleSignInClick}
        handleCartClick={handleCartClick}
        routes={routes}
        cartExists={cartExists}
      />
      <NavbarMobile
        loginStatus={loginStatus}
        handleProfileClick={handleProfileClick}
        handleSupportClick={handleSupportClick}
        handleSignOutClick={handleSignOutClick}
        handleSignInClick={handleSignInClick}
        handleCartClick={handleCartClick}
        routes={routes}
        cartExists={cartExists}
      />
    </>
  )
}

export default Navbar
