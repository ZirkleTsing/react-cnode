const styles = (theme) => {
  const style = {
    primaryWrapper: {
      display: 'flex',
    },
    tab: {
      marginRight: 10,
      backgroundColor: theme.palette.primary[500],
      textAlign: 'center',
      color: '#fff',
      borderRadius: 3,
      padding: '0 6px',
      fontSize: '12px',
    },
    top: {
      backgroundColor: theme.palette.secondary[400],
    },
    author: {
      marginRight: 5,
      minWidth: 80,
      maxWidth: 80,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    comment: {
      marginRight: 5,
      color: theme.palette.primary[500],
    },
    read: {
      marginLeft: 5,
    },
    secondaryWrapper: {
      display: 'flex',
    },
    listItemWrapper: {
      display: 'flex',
    },
  }
  return style
}

export default styles
