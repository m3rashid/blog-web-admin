import {
  ArrowsLeftRight,
  Article,
  Edit,
  Notification,
  User,
} from 'tabler-icons-react'
import { useNavigate } from 'react-router-dom'
import { Avatar, Divider, Menu } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { Dispatch, FC, SetStateAction, useState } from 'react'

import CreateCategoryModal from 'components/createCategoryModal'
import { useRecoilValue } from 'recoil'
import { userLoggedIn } from 'atoms/user'

const LoggedInActions: FC<{
  setModalOpen: Dispatch<SetStateAction<boolean>>
}> = ({ setModalOpen }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    // TODO: logout user
    // signOut({ redirect: false })
    showNotification({
      title: 'Logged out Successfully',
      message: 'You have been logged out',
    })
  }

  return (
    <>
      <Menu.Label>Author Actions</Menu.Label>
      <Menu.Item
        icon={<Article size={14} />}
        onClick={() => navigate('/me/posts')}
      >
        All Posts
      </Menu.Item>
      <Menu.Item
        icon={<Edit size={14} />}
        onClick={() => navigate('/blogs/create')}
      >
        Create Post
      </Menu.Item>
      <Menu.Item
        icon={<Notification size={14} />}
        onClick={() => setModalOpen(true)}
      >
        Create Category
      </Menu.Item>

      <Divider />

      <Menu.Label>Your Session</Menu.Label>
      <Menu.Item icon={<ArrowsLeftRight size={14} />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </>
  )
}

interface IProps {}

const HeaderProfileDropdown: FC<IProps> = () => {
  const isLoggedIn = useRecoilValue(userLoggedIn)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <CreateCategoryModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      {isLoggedIn && (
        <Menu
          control={
            <Avatar
              radius={100}
              size={30}
              color="yellow"
              style={{ cursor: 'pointer' }}
            >
              <User />
            </Avatar>
          }
        >
          <LoggedInActions setModalOpen={setModalOpen} />
        </Menu>
      )}
    </>
  )
}

export default HeaderProfileDropdown
