import './index.scss';
import makeSchemaRenderer from '../SchemaRender';
import TableSchema from './Table';
import DetailSchema from './Detail';

export default {
  label: '自定义',
  icon: 'fa fa-th',
  badgeClassName: 'bg-info',
  children: [
    {
      label: '表格',
      path: '/examples/custom/table',
      component: makeSchemaRenderer(TableSchema)
    },
    {
      label: '详情',
      path: '/examples/custom/detail',
      component: makeSchemaRenderer(DetailSchema)
    }
  ]
};
