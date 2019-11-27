import React from 'react'

import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { useTranslation } from 'react-i18next'

import CollectionTable from '../../../pieces/CollectionTable'
import Page from '../../../pieces/Page'
import Button from '../../../pieces/Button'

const CollectionPage = (props) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const { collectionName } = useParams()

  const onAdd = (event, rowData) => dispatch(push(`/collections/${collectionName}/new`))

  return (
    <Page>
      <Button onClick={onAdd}>
        {t('Add new!')}
      </Button>
      <CollectionTable
        isSystemCollection={false}
        collectionName={collectionName}
      />
    </Page>
  )
}

CollectionPage.propTypes = {}

export default CollectionPage