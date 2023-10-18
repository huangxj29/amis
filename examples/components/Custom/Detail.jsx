export default {
  type: 'page',
  initApi: '/api/sample',
  body: [
    {
      type: 'panel',
      title: {
        type: 'flex',
        justify: 'space-between',
        items: [
          {
            type: 'tpl',
            tpl: '基本信息'
          },
          {
            type: 'button',
            label: '绑定',
            level: 'link',
            size: 'xs'
          }
        ]
      },
      column: 2,
      body: {
        type: 'property',
        labelStyle: {
          width: '6%'
        },
        contentStyle: {
          width: '15%'
        },
        items: [
          {label: '用户ID', content: 1},
          {
            label: '状态',
            content: 2
          },
          {label: '微信昵称', content: '${id}'},
          {label: '微信openId', content: 1}
        ]
      }
    },
    {
      type: 'wrapper',
      body: [
        {
          label: '关闭',
          type: 'button',
          level: 'primary',
          disabled: true
        },
        {
          label: '关闭',
          type: 'button',
          level: 'enhance',
          disabled: true
        },
        {
          label: '关闭',
          type: 'button',
          level: 'secondary',
          disabled: true
        },
        {
          label: '关闭',
          type: 'button',
          level: 'info',
          disabled: true
        },
        {
          label: '关闭',
          type: 'button',
          level: 'success',
          disabled: true
        },
        {
          label: '关闭',
          type: 'button',
          level: 'warning',
          disabled: true
        },
        {
          label: '关闭',
          type: 'button',
          level: 'danger',
          disabled: true
        },
        {
          label: '关闭',
          type: 'button',
          level: 'danger',
          disabled: true
        },
        {
          label: '关闭',
          type: 'button',
          level: 'danger',
          disabled: true
        },
        {
          label: '关闭',
          type: 'button',
          level: 'default',
          disabled: true
        }
      ]
    }
  ]
};
