import { ThumbsUp, Trash } from "phosphor-react"
import { Avatar } from "./Avatar"
import styles from "./Comment.module.css"
import { useState } from "react"

interface CommentsProps {
  content: string
  onDeleteComment: (comment: string) => void
}

export function Comment({content, onDeleteComment}: CommentsProps) {
  const[likecount, setLikeCount] = useState(0)
  function handleDeleteComment() {
    onDeleteComment(content)
  }
  function handleLikeComment() {
    setLikeCount((state) =>{
      return state + 1
    })
  }
  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="src/assets/profile-leslie.svg"/>
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Devon Lane</strong>
              <time 
                title="16 de Dezembro às 19:37h" 
                dateTime="2024-12-16 19:37:30">Publicado há 1h
              </time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24}/>
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button 
            onClick={handleLikeComment}
          >
            <ThumbsUp />
            Aplaudir 
            <span>{likecount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}