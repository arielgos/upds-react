import { useState, useEffect, useRef } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { addDoc, Timestamp, collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { auth, firestore } from './Firebase'
import Form from 'react-bootstrap/Form'

function Home () {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [text, setText] = useState('')
  const [texts, setTexts] = useState([])

  const dataFetchedReference = useRef(false)

  useEffect(() => {
    if (dataFetchedReference.current) return
    dataFetchedReference.current = true

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        console.log('user is logged out')
        navigate('/login')
      }
    })
  }, [navigate])

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const docReference = await addDoc(collection(firestore, 'texts'), {
        text,
        user: user.email,
        time: Timestamp.fromDate(new Date()).toMillis()
      })
      setText('')
      console.log('Document written with ID: ', docReference.id)
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage, error)
    }
  }

  useEffect(() => {
    const reference = collection(firestore, 'texts')
    const q = query(reference, orderBy('time', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const texts = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        texts.push({
          id: doc.id,
          text: data.text,
          user: data.user,
          time: data.time
        })
      })
      setTexts(texts)
    })
    return () => unsubscribe()
  }, [])

  return (
    <>
      <span>{user != null ? user.email : ''}</span>
      <Form onSubmit={onSubmit}>
        <Form.Control
          placeholder='Text'
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Form>

      {
                texts.map((item) => (
                  <div
                    key={item.id}
                  >
                    <span>
                      {item.text}
                    </span>
                    <br />
                  </div>
                ))
            }
    </>
  )
}

export default Home
