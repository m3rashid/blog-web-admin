import { Button, Modal, SimpleGrid, TextInput } from '@mantine/core'
import { AlphabetLatin, Webhook } from 'tabler-icons-react'
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import useHttp from 'hooks/useHttp'
import { categoryAtom } from 'atoms/categories'
import { useCategoryModalStyles } from 'styles/useCategoryModalStyles'
interface IProps {
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
}

const CreateCategoryModal: FC<IProps> = ({ modalOpen, setModalOpen }) => {
  const [category, setCategory] = useState({ name: '', slug: '' })
  const setGlobalCategories = useSetRecoilState(categoryAtom)
  const { classes } = useCategoryModalStyles()
  const { loading, request } = useHttp('create-category')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCategory((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateCategory = async () => {
    if (category.name.trim() === '' || category.slug.trim() === '') return
    const { data: saveRes } = await request({
      endpoint: '/api/category/create',
      body: category,
    })
    setModalOpen(false)
    if (!saveRes) return
    setCategory({ name: '', slug: '' })
    setGlobalCategories((prev) => [...prev, saveRes])
  }

  return (
    <Modal
      opened={modalOpen}
      onClose={() => setModalOpen(false)}
      title="Create a new Category for posts"
      className={classes.modal}
    >
      <SimpleGrid>
        <TextInput
          name="name"
          label="Enter a name for the category"
          value={category.name}
          required
          icon={<AlphabetLatin />}
          className={classes.input}
          onChange={handleChange}
          placeholder="Enter Name for the category"
        />
        <TextInput
          name="slug"
          label="Enter a slug for the category"
          value={category.slug}
          required
          icon={<Webhook />}
          className={classes.input}
          onChange={handleChange}
          placeholder="Enter slug (unique) for the category"
        />
        <Button
          className={classes.input}
          onClick={handleCreateCategory}
          loading={loading}
        >
          Create Category
        </Button>
      </SimpleGrid>
    </Modal>
  )
}

export default CreateCategoryModal
