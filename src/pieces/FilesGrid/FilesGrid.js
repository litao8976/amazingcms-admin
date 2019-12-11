import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import withConfirm from 'material-ui-confirm'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import formatBytes from '@bit/amazingdesign.utils.format-bytes'

import { Button, Typography, Tooltip } from '@material-ui/core'
import { Delete as DeleteIcon, Link as LinkIcon, CloudDownload as CloudDownloadIcon } from '@material-ui/icons'

import FileCard from './FileCard'

const makeSrc = (bucketName, file) => `${window._env_.REACT_APP_API_URL}/downloader/${bucketName}/${file._id}`
const makeThumbnailSrc = (bucketName, file) => (
  makeSrc(bucketName, file) +
  '?resize=' +
  encodeURIComponent(JSON.stringify({ height: 280 }))
)

const makeDesc = (file) => [
  <Typography key={'title'} style={{ fontSize: 'small' }} noWrap={true} component={'p'}>
    <b>Title:</b> {file.filename}
  </Typography>,
  <Typography key={'createdAt'} style={{ fontSize: 'small' }} noWrap={true} component={'p'}>
    <b>Created at:</b> {file.uploadDate}
  </Typography>,
  <Typography key={'type'} style={{ fontSize: 'small' }} noWrap={true} component={'p'}>
    <b>Type:</b> {file.metadata.mimetype}
  </Typography>,
  <Typography key={'size'} style={{ fontSize: 'small' }} noWrap={true} component={'p'}>
    <b>Size:</b> {formatBytes(file.length)}
  </Typography>,
]

const makeActions = ({ bucketName, confirm, onDelete, t }) => (file) => [
  <Tooltip key={'delete'} title={'Delete'}>
    <Button size={'small'} color={'primary'} onClick={() => {
      confirm(
        () => (onDelete(file._id)),
        {
          confirmationText: t('Ok'),
          cancellationText: t('Cancel'),
          title: t('Are you sure?'),
          description: t('This will permanently delete this item!'),
        }
      )()
    }}>
      <DeleteIcon />
    </Button>
  </Tooltip>,
  <Tooltip key={'download'} title={'Download'}>
    <Button size={'small'} color={'primary'} onClick={() => window.open(makeSrc(bucketName, file))}>
      <CloudDownloadIcon />
    </Button>
  </Tooltip>,
  <Tooltip key={'copyLink'} title={'Copy download link'}>
    <CopyToClipboard text={makeSrc(bucketName, file)} >
      <Button size={'small'} color={'primary'}>
        <LinkIcon />
      </Button>
    </CopyToClipboard>
  </Tooltip>,
]

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
}

const FilesGrid = ({ data, confirm, onDelete, bucketName }) => {
  const { t } = useTranslation()

  return (
    <div style={styles.root}>
      {
        data &&
        data.map((file) => (
          <FileCard
            key={file._id}
            src={makeThumbnailSrc(bucketName, file)}
            title={file.filename}
            desc={makeDesc(file)}
          >
            {makeActions({ bucketName, confirm, onDelete, t })(file)}
          </FileCard>
        ))
      }
    </div >
  )
}

FilesGrid.propTypes = {
  data: PropTypes.array,
  bucketName: PropTypes.string,
  onDelete: PropTypes.func,
  confirm: PropTypes.func.isRequired,
}

export default withConfirm(FilesGrid)