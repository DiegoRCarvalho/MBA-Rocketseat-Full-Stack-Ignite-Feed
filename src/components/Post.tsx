import styles from "./Post.module.css"
import { format, formatDistanceToNow } from "date-fns"
import ptBR from 'date-fns/locale/pt-BR'
import { Avatar } from "./Avatar"
import { Comment } from "./Comment"
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react"

interface Author {
  name: string
  role: string
  avatarUrl: string
}

interface Content {
  type: 'paragraph' | 'link'
  content: string
}

export interface PostType {
  id: number
  author: Author
  publishedAt: Date
  content: Content[]
}

interface PostProps {
  post: PostType
}


export function Post({ post }: PostProps) {
  
  const [comments, setComments] = useState([
      "Postagem legal."
  ])

  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = format(post.publishedAt, "dd 'de' LLLL 'de' Y 'às' HH:mm'h'", {locale: ptBR})

  const publishDateRelativeToNow = formatDistanceToNow(post.publishedAt, {locale: ptBR})

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()
        
    setComments([...comments, newCommentText]);
    setNewCommentText('')
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('Esse campo é obrigatório')
  }

  function deleteComment (commentToDelete: string) {
    const commentWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete
    })
    setComments(commentWithoutDeletedOne) 
  }

  const isNewCommentEmpty = newCommentText.length ===0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar 
            hasBorder
            src={post.author.avatarUrl}
          />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
        <time 
          title={publishedDateFormatted} 
          dateTime={post.publishedAt.toISOString()}>
          Há {publishDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {post.content.map(line => {
          switch(line.type) {
            case 'paragraph':
              return <p key={`${line.content}-${publishedDateFormatted}`}>{line.content}</p>
            case 'link':
              return <p key={`${line.content}-${publishedDateFormatted}`}><a href="#">{line.content}</a></p>
          }

        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea 
          name="comment"
          placeholder="Deixe um comentário."
          value={newCommentText} 
          onChange={handleNewCommentChange}
          required={true}
          onInvalid={handleNewCommentInvalid}
        />
        <footer>
          <button 
            type="submit"
            disabled={isNewCommentEmpty}
          >
            Publicar
          </button>
        </footer>
      </form>
      
      <div className={styles.commentList}>
        {comments.map(comment => {
          return (
            <Comment 
              key={`${comment}-${publishedDateFormatted}`} 
              content={comment}
              onDeleteComment={deleteComment}
            />
          )
        })}
      </div>
    </article>
  )
}