import React, { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import MaterialTable from 'material-table'

import { renderField } from './renderField'

const CollectionTableStateless = ({ collectionData, data, options, ...otherProps }) => {
  const columns = useMemo(() => (
    collectionData ?
      collectionData.tableFields
        .map((field) => ({
          title: field.label || field.name,
          field: field.name,
          render: renderField(field),
          lookup: field.lookup,
        }))
      :
      []
  ), [collectionData])

  // @HACK this state is only to rerender MaterialTable
  // which handles internal state, and must be rerendered 
  // through key, form this component
  const [key, setKey] = useState(1)
  useEffect(() => (data) => {
    setKey(key + 1)
  }, [data])

  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        // @HACK reset state when data changes
        // from empty to promise 
        key={key}
        columns={columns}
        data={data || []}
        options={{
          pageSize: 5,
          pageSizeOptions: [5, 10, 20, 50, 100],
          search: false,
          draggable: false,
          sorting: false,
          ...options,
        }}
        localization={{
          header: { actions: '' },
        }}
        {...otherProps}
      />
    </div>
  )
}

CollectionTableStateless.propTypes = {
  options: PropTypes.object,
  collectionData: PropTypes.object.isRequired,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
}

export default CollectionTableStateless