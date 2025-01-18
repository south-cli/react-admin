import { useState } from 'react';
import { useCommonStore } from '@/hooks/useCommonStore';
import { checkPermission } from '@/utils/permissions';
import WangEditor from '@/components/WangEditor';
import BaseContent from '@/components/Content/BaseContent';

function MyEditor() {
  const { permissions } = useCommonStore();
  // 编辑器内容
  const [html, setHtml] = useState('<p>hello</p>');
  const isPermission = checkPermission('/demo/editor', permissions);

  return (
    <BaseContent isPermission={isPermission}>
      <div className='m-10px p-5 rounded-5 bg'>
        <WangEditor
          value={html}
          onChange={content => setHtml(content)}
        />
      </div>
    </BaseContent>
  );
}

export default MyEditor;
