let i = 0;
export default {
  type: 'page',
  name: 'page',
  title: '',
  toolbar: [],
  body: {
    type: 'crud',
    draggable: false,
    syncLocation: false,
    // affixHeader: false,
    columnsTogglable: false,
    api: '/api/sample',
    perPageAvailable: [10, 20, 50, 100],
    keepItemSelectionOnPageChange: false,
    initFetch: false,
    filter: {
      title: '',
      className: 'global-padding-10px',
      trimValues: true,
      submitOnChange: false,
      controls: [
        {
          type: 'input-datetime',
          name: 'start_time',
          placeholder: '开始时间',
          format: 'YYYY-MM-DD HH:mm:ss',
          clearable: false,
          size: 'md',
          maxDate: '$end_time',
          title: '开始时间'
        },
        {
          type: 'input-datetime',
          name: 'end_time',
          placeholder: '截止时间',
          format: 'YYYY-MM-DD HH:mm:ss',
          clearable: false,
          size: 'md',
          minDate: '$start_time',
          title: '截止时间'
        },
        {
          type: 'text',
          name: 'id',
          placeholder: '用户ID',
          clearable: true,
          size: 'md'
        },
        {
          type: 'select',
          name: 'test',
          searchable: true,
          placeholder: 'searchApi',
          clearable: true,
          selectMode: 'chained',
          searchApi: {
            url: '/api/sample',
            method: 'post',
            adaptor: function (payLoad) {
              i++;
              if (i % 2 === 0) {
                return {
                  data: {
                    options: [
                      {
                        label: '诸葛亮',
                        children: [
                          {
                            label: '曹操',
                            value: 'caocao'
                          },
                          {
                            label: '钟无艳',
                            value: 'zhongwuyan'
                          }
                        ]
                      },
                      {
                        label: '打野',
                        children: [
                          {
                            label: '李白',
                            value: 'libai'
                          },
                          {
                            label: '韩信',
                            value: 'hanxin'
                          },
                          {
                            label: '云中君',
                            value: 'yunzhongjun'
                          }
                        ]
                      }
                    ]
                  }
                };
              } else {
                return {
                  data: {
                    options: [
                      {
                        label: '诸葛亮11',
                        children: [
                          {
                            label: '曹操11',
                            value: 'caocao11'
                          },
                          {
                            label: '钟无艳11',
                            value: 'zhongwuyan11'
                          }
                        ]
                      }
                    ]
                  }
                };
              }
            }
          }
        },
        {
          type: 'select',
          name: 'test1',
          searchable: true,
          placeholder: 'options',
          clearable: true,
          selectMode: 'chained',
          options: [
            {
              label: '诸葛亮',
              value: 'zhugeliang',
              children: [
                {
                  label: '曹操',
                  value: 'caocao'
                },
                {
                  label: '钟无艳',
                  value: 'zhongwuyan'
                }
              ]
            }
          ]
        },
        {
          type: 'select',
          name: 'test2',
          searchable: true,
          placeholder: 'options',
          clearable: true,
          options: [
            {
              label: '诸葛亮',
              value: 'zhugeliang'
            }
          ]
        },
        {
          label: '查询',
          level: 'primary',
          type: 'submit',
          size: 'md'
        },
        {
          label: '重置',
          type: 'reset'
        },
        {
          label: '高级筛选',
          type: 'button',
          level: 'warning',
          onClick: 'props.data.showMore=!props.data.showMore'
        }
      ]
    },
    filterTogglable: true,
    headerToolbar: [
      {
        align: 'left',
        type: 'button',
        label: '新增',
        level: 'primary',
        actionType: 'dialog',
        dialog: {
          title: '绑定代金券',
          size: 'md',
          body: {
            type: 'form',
            mode: 'horizontal',
            horizontal: {
              left: 0,
              right: 12,
              offset: 0
            },
            body: [
              {
                type: 'picker',
                name: 'ids',
                autoFill: {
                  selectItems: '${items}'
                },
                embed: true,
                multiple: true,
                source: '/api/sample',
                valueField: 'id',
                pickerSchema: {
                  type: 'crud',
                  draggable: false,
                  syncLocation: false,
                  affixHeader: false,
                  keepItemSelectionOnPageChange: false,
                  columnsTogglable: false,
                  headerToolbar: [],
                  initFetch: false,
                  filter: {
                    title: '',
                    className: 'global-padding-10px',
                    trimValues: true,
                    submitOnChange: false,
                    controls: [
                      {
                        type: 'input-datetime',
                        name: 'start_time',
                        placeholder: '开始时间',
                        format: 'YYYY-MM-DD HH:mm:ss',
                        clearable: false,
                        size: 'md',
                        maxDate: '$end_time',
                        title: '开始时间'
                      },
                      {
                        type: 'input-datetime',
                        name: 'end_time',
                        placeholder: '截止时间',
                        format: 'YYYY-MM-DD HH:mm:ss',
                        clearable: false,
                        size: 'md',
                        minDate: '$start_time',
                        title: '截止时间'
                      },
                      {
                        type: 'text',
                        name: 'id',
                        placeholder: '用户ID',
                        clearable: true,
                        size: 'md'
                      },
                      {
                        label: '查询',
                        level: 'primary',
                        type: 'submit',
                        size: 'md'
                      },
                      {
                        label: '重置',
                        type: 'reset'
                      },
                      {
                        label: '高级筛选',
                        type: 'button',
                        level: 'warning',
                        onClick: 'props.data.showMore=!props.data.showMore'
                      }
                    ]
                  },
                  footerToolbar: [
                    {
                      align: 'right',
                      type: 'pagination'
                    },
                    {
                      align: 'right',
                      type: 'switch-per-page'
                    },
                    {
                      align: 'right',
                      type: 'statistics'
                    }
                  ],
                  columns: [
                    {
                      name: 'id',
                      label: 'ID',
                      type: 'text'
                    },
                    {
                      name: 'engine',
                      label: 'Rendering engine',
                      type: 'text'
                    },
                    {
                      name: 'browser',
                      label: 'Browser',
                      type: 'text'
                    },
                    {
                      name: 'platform',
                      label: 'Platform(s)'
                    }
                  ]
                }
              }
            ]
          },
          actions: [
            {
              type: 'button',
              label: '提交',
              level: 'primary',
              close: true
            },
            {
              type: 'button',
              actionType: 'close',
              label: '取消'
            }
          ]
        }
      },
      {
        type: 'columns-toggler',
        align: 'right'
      },
      {
        type: 'drag-toggler',
        align: 'right'
      }
    ],
    footerToolbar: [
      {
        align: 'right',
        type: 'pagination'
      },
      {
        align: 'right',
        type: 'switch-per-page'
      },
      {
        align: 'right',
        type: 'statistics'
      }
    ],
    columns: [
      {
        type: 'operation',
        label: '操作',
        width: 100,
        buttons: [
          {
            type: 'button',
            level: 'link',
            actionType: 'url',
            label: '${id}'
          },
          {
            type: 'button',
            icon: 'fa fa-eye',
            actionType: 'dialog',
            tooltip: '查看',
            dialog: {
              title: '查看',
              body: {
                type: 'form',
                body: [
                  {
                    type: 'static',
                    name: 'engine',
                    label: 'Engine'
                  },
                  {
                    type: 'static',
                    name: 'browser',
                    label: 'Browser'
                  },
                  {
                    type: 'static',
                    name: 'platform',
                    label: 'Platform(s)'
                  },
                  {
                    type: 'static',
                    name: 'version',
                    label: 'Engine version'
                  },
                  {
                    type: 'static',
                    name: 'grade',
                    label: 'CSS grade'
                  },
                  {
                    type: 'html',
                    html: '<p>添加其他 <span>Html 片段</span> 需要支持变量替换（todo）.</p>'
                  }
                ]
              }
            }
          },
          {
            type: 'button',
            icon: 'fa fa-pencil',
            tooltip: '编辑',
            actionType: 'drawer',
            drawer: {
              position: 'left',
              size: 'md',
              title: '编辑',
              body: {
                type: 'form',
                name: 'sample-edit-form',
                api: '/api/sample/$id',
                body: [
                  {
                    type: 'input-text',
                    name: 'name',
                    label: 'name',
                    placeholder: '请输入name',
                    required: true,
                    clearable: true,
                    validateOnChange: true,
                    maxLength: 50
                  },
                  {
                    type: 'input-rich-text',
                    label: '活动细则',
                    name: 'activity_details',
                    required: true,
                    maxLength: 1,
                    options: {
                      menubar: false,
                      height: 200,
                      toolbar:
                        'undo redo | image | fontfamily | styles | formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
                    }
                    // receiver: {
                    //   url: 'https://filegateway-dev.jlpay.com/common/file/upload',
                    //   dataType: 'form-data',
                    //   method: 'post',
                    //   requestAdaptor: api => {
                    //     console.log(api);
                    //     return;
                    //   }
                    // }
                  },
                  {
                    type: 'input-table',
                    name: 'table',
                    label: 'Table',
                    needConfirm: false,
                    addable: true,
                    columns: [
                      {
                        // "type": "input-text",
                        label: 'A',
                        name: 'a',
                        disabled: true
                        // "disabledOn": "${true}"
                      },
                      {
                        type: 'input-text',
                        label: 'B',
                        name: 'b',
                        disabled: true
                        // "disabledOn": "${true}"
                      },
                      {
                        type: 'input-text',
                        label: 'C',
                        name: 'c',
                        disabledOn: '${true}'
                      },
                      {
                        label: 'D',
                        name: 'd'
                      },
                      {
                        type: 'operation',
                        label: '操作',
                        buttons: [
                          {
                            label: '删除',
                            type: 'button',
                            level: 'link'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'input-text',
                    name: 'engine',
                    label: 'Engine',
                    required: true
                  },
                  {
                    type: 'input-text',
                    name: 'browser',
                    label: 'Browser',
                    required: true
                  },
                  {
                    type: 'input-text',
                    name: 'platform',
                    label: 'Platform(s)',
                    required: true
                  },
                  {
                    type: 'input-text',
                    name: 'version',
                    label: 'Engine version'
                  },
                  {
                    type: 'select',
                    name: 'grade',
                    label: 'CSS grade',
                    options: ['A', 'B', 'C', 'D', 'X']
                  }
                ]
              }
            }
          },
          {
            type: 'button',
            icon: 'fa fa-times text-danger',
            actionType: 'ajax',
            tooltip: '删除',
            confirmText: '您确认要删除?',
            api: 'delete:/api/sample/$id'
          }
        ],
        toggled: true
      },
      {
        name: 'id',
        label: 'ID',
        type: 'text'
      },
      {
        name: 'engine',
        label: 'Rendering engine',
        type: 'text'
      },
      {
        name: 'browser',
        label: 'Browser',
        type: 'text'
      },
      {
        name: 'platform',
        label: 'Platform(s)'
      },
      {
        name: 'version',
        label: 'Engine version'
      },
      {
        type: 'text',
        name: 'grade',
        label: 'CSS grade'
      }
    ]
  }
};
