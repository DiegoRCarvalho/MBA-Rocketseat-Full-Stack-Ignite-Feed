import styles from "./Avatar.module.css"
import {ImgHTMLAttributes} from "react"

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean
  // As propriedades que já existem no elemento de imagem do HTML não precisam ser informadas na interface, pois são recuperadas do ImgHTMLAttributes<HTMLImageElement>.
}


// Rest operator ...props irá recuperar todas as outras propriedade que não foram desestruturadas.
export function Avatar({hasBorder = true, ...props}: AvatarProps) {
  return (
    <img  
      className={hasBorder ? styles.avatarWithBorder : styles.avatar} 
      {...props} // Irá pegar cada propriedade que existe no objeto props e envia para o elemento image.
    />
  )
}