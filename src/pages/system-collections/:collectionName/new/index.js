import React from 'react'

import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { useTranslation } from 'react-i18next'

import { Typography } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'

import { Uniform } from '../../../../bits/uniforms/Uniform'
import { useDataItemFromStore } from '../../../../bits/redux-rest-services/useDataItemFromStore'
import { useService } from '../../../../bits/redux-rest-services/useService'

import Page from '../../../../bits/Page'
import Button from '../../../../pieces/Button'
import CheckCollectionPermissions from '../../../../bits/CheckCollectionPermissions'

const EditSystemCollectionPage = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { collectionName } = useParams()
  const collectionData = useDataItemFromStore('system-collections', { query: { name: collectionName } })
  const { create } = useService('system-collection-' + collectionName)

  const schema = collectionData && collectionData.schema

  const goBack = () => dispatch(push(`/system-collections/${collectionName}`))

  const onSubmit = (data) => create({}, { data }).then(goBack)

  return (
    <CheckCollectionPermissions
      collectionData={collectionData}
      checks={['create']}
    >
      <Page
        usePaper={true}
        childrenAbove={
          <Button
            onClick={goBack}
            variant={'text'}
            startIcon={<ArrowBack />}
          >
            {t('Go back!')}
          </Button>
        }
      >
        <Typography variant={'h5'}>
          {t('Add new item')}
        </Typography>
        <Uniform
          schema={schema}
          onSubmit={onSubmit}
          submitLabel={t('Submit')}
        />
      </Page>
    </CheckCollectionPermissions>
  )
}

EditSystemCollectionPage.propTypes = {}

export default EditSystemCollectionPage