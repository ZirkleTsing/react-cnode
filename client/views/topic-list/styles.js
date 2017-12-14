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
