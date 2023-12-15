import './Cart.css'

export const ItemsContainer = (props) => {
  return (
      <div className={'items-container'}>
          {props.children}
      </div>
  )
}