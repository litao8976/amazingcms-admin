import React from 'react'

import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'

import { useCollectionData } from '../../../../bits/useCollectionData'
import { useCollectionItems } from '../../../../bits/useCollectionItems'

const styles = {
  root: {
    position: 'relative',
    minHeight: 400,
  },
  content: {
    padding: '2rem',
  },
}

const EditCollectionPage = (props) => {
  const { t } = useTranslation()

  const { collectionName, id } = useParams()
  const collectionData = useCollectionData(collectionName)
  const {ErrorMessage, Loader, data} = useCollectionItems(collectionName, id)

  return (
    <div style={styles.root}>
      <ErrorMessage message={t('Error occurred!')}>
        <Loader>
          <div style={styles.content}>
            {JSON.stringify(collectionData)}
            ----
            {JSON.stringify(data)}
          </div>
        </Loader>
      </ErrorMessage>
    </div>
  )
}

EditCollectionPage.propTypes = {}

export default EditCollectionPage