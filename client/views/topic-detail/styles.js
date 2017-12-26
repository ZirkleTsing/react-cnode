const styles = (theme) => {
  const style = {
    header: {
      padding: 10,
      borderBottom: '1px solid #e5e5e5',
      // display: 'flex',
      // alignItems: 'center',
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
    title: {
      margin: '8px 0',
      fontSize: '22px',
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
    },
    extra: {
      fontSize: '12px',
      color: '#838383',
    },
    blank: {
      marginRight: 7,
    },
    content: {
      padding: 10,
      '& .markdown-text': {
        color: '#333',
        wordBreak: 'break-word',
        padding: '0 10px',
      },
      '& h1, h2, h3': {
        lineHeight: '40px',
      },
      '& h2': {
        fontSize: '26px',
        margin: '30px 0 15px',
        borderBottom: '1px solid #eee',
      },
      '& p': {
        margin: '1em 0',
        fontSize: '15px',
        lineHeight: '1.7em',
        overflow: 'auto',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
      },
      '& ul': {
        display: 'block',
        listStyleType: 'disc',
        padding: 0,
        margin: '0 0 10px 25px',
      },
      '& li': {
        lineHeight: '2em',
        fontSize: '14px',
        display: 'list-item',
        textAlign: '-webkit-match-parent',
      },
      '& img': {
        maxWidth: '100%',
        height: 'auto',
        // position: 'absolute',
        // left: '50%',
        // transform: 'translateY(-50%)',
      },
      '& a': {
        color: '#08c',
        textDecoration: 'none',
        cursor: 'pointe',
      },
    },
    replies: {
      // padding: 20,
      '& .repliesbar': {
        color: '#444',
        fontSize: '14px',
        wordBreak: 'break-word',
        lineHeight: '20px',
        padding: '10px 10px',
        backgroundColor: '#f6f6f6',
        borderRadius: '3px 3px 0 0',
      },
      '& .list': {
        paddingTop: 0,
        paddingBottom: 0,
      },
      '& li': {
        borderTop: '1px solid #f0f0f0',
      },
      '& .markdown-text': {
        '& h1, h2, h3': {
          lineHeight: '40px',
        },
        '& h2': {
          fontSize: '26px',
          margin: '30px 0 15px',
          borderBottom: '1px solid #eee',
        },
        '& p': {
          margin: '1em 0',
          fontSize: '15px',
          lineHeight: '1.7em',
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
        },
        '& ul': {
          display: 'block',
          listStyleType: 'disc',
          padding: 0,
          margin: '0 0 10px 25px',
        },
        '& li': {
          lineHeight: '2em',
          fontSize: '14px',
          display: 'list-item',
          textAlign: '-webkit-match-parent',
          borderTop: 'none',
        },
        '& img': {
          maxWidth: '80%',
          height: 'auto',
          // position: 'absolute',
          // left: '50%',
          // transform: 'translateY(-50%)',
        },
        '& a': {
          color: '#08c',
          textDecoration: 'none',
          cursor: 'pointe',
        },
      },
    },
    avatar: {
      width: '60px',
      height: '60px',
    },
  }

  return style
}

export default styles
