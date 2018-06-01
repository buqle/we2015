<?php
/**
 * Created by PhpStorm.
 * User: forest
 * Date: 2016/5/10
 * Time: 9:52
 */
use Phalcon\Http\Response;
use Phalcon\Paginator\Adapter\Model as PaginatorModel;
use Phalcon\Mvc\Url;
use Phalcon\Mvc\Model;
class BackEndrhdController  extends \Phalcon\Mvc\Controller{
    public function initialize() {
        $this->view->setTemplateBefore('backendrhd/header');
    }
    public function indexAction() {
        $this->view->setRenderLevel(\Phalcon\Mvc\View::LEVEL_ACTION_VIEW);
        $errorMessage = '';
        if ($this->request->isPost()) {
            if ($this->security->checkToken()) {

                $userName = $this->request->getPost("username");
                $passWord = $this->request->getPost("password");
                if ($userName == '' || $passWord == '') {
                    $errorMessage = '用户名或密码为空';
                } else {
                    $user = Users::findFirst(array('username=\''.$userName.'\''));
                    if ($user) {
                        if ($user->password == md5($passWord)) {
                            $this->session->set('id', $user->id);
                            $this->session->set('username', $user->username);
                            $response = new Response();
                            $response->redirect("/zixun/backendrhd/home");
                            $this->view->disable();
                            return $response;
                        } else {
                            $errorMessage = '用户名或密码错误';
                        }
                    } else {
                        $errorMessage = '用户名或密码错误';
                    }
                }
            } else {
                $errorMessage = '参数错误';
            }
        }
        $this->view->errorMessage = $errorMessage;
    }

    public function LoginOutAction() {
        $this->session->destroy();
        $response = new Response();
        $response->redirect("/zixun/backendrhd/index", true, 301)->sendHeaders();
    }
    //后台首页
    public function HomeAction() {
        
    }

    public function AddUserAction() {
        $this->checkIsLogin();
        $errorMessage = '';
        if ($this->request->isPost()) {
            if ($this->security->checkToken()) {
                $userName = $this->request->getPost("username");
                $passWord = $this->request->getPost("password");
                if ($userName == '' || $passWord == '') {
                    $errorMessage = '用户名或密码为空';
                } else {
                    $user = Users::findFirst(array('username=\''.$userName.'\''));
                    if ($user != false) {
                        $errorMessage = '用户名已存在';
                    } else {
                        $user = new Users();
                        $user->username= $userName;
                        $user->password= md5($passWord);
                        $user->add_time = $user->last_login_time = time();
                        $user->add_ip = $user->last_login_ip = $this->request->getClientAddress();
                        if ($user->create() == false) {
                            $errorMessage = $user->getMessages()[0];
                        } else{
                            $response = new Response();
                            $response->redirect("/zixun/backendrhd/userlist");
                            $this->view->disable();
                            return $response;
                        }
                    }
                }
            } else {
                $errorMessage = '非法操作';
            }
        }
        $this->view->errorMessage = $errorMessage;
    }

    public function EditUserAction($id = 0) {
        $errorMessage = '';
        $this->checkIsLogin();
        $id = (int) $id;
        $users = Users::findFirst($id);
        if ($users == false) {
            $response = new Response();
            $response->redirect("/zixun/backendrhd/userlist");
            $this->view->disable();
            return $response;
        }
        if ($this->request->isPost()) {
            $passWord = $this->request->getPost("password");
            if ($passWord == '') {
                $errorMessage = '用户名或密码为空';
            }
            $users->password = md5($passWord);
            if ($users->save() == false) {
                $errorMessage = $users->getMessages()[0];
            } else {
                $response = new Response();
                $response->redirect("/zixun/backendrhd/userlist");
                $this->view->disable();
                return $response;
            }
        }
        $this->view->errorMessage = $errorMessage;
        $this->view->users = $users;

    }

    public function DelUserAction($id = 0) {
        $this->checkIsLogin();
        $id = (int) $id;
        Users::findFirst($id)->delete();
        $response = new Response();
        $response->redirect("/zixun/backendrhd/userlist");
        $this->view->disable();
        return $response;
    }

    /**
     * 管理用户列表
     */
    public function UserListAction() {
        $this->checkIsLogin();
        $this->view->userLists = Users::find();
    }

    /**
     * 添加目录
     * @return Response
     */
    public function AddColumnAction() {
        $parents = '';
        $errorMessage = '';
        $this->checkIsLogin();
        if ($this->request->isPost()) {
            if ($this->security->checkToken()) {
                $parent_id = $this->request->getPost('parent_id', 'int');
                $name = $this->request->getPost('name', 'string');
                $keyword = $this->request->getPost('keyword', 'string');
                $description = $this->request->getPost('description', 'string');
                $url = $this->request->getPost('url', 'string');
                $content = $this->request->getPost('content', 'string');
                $column = Category::findFirst(array('name="'.$name.'"'));
                if ($column != false)  {
                    $errorMessage = '栏目名已经存在！';
                } else {
                    $category = Category::find(array('1=1', 'columns'=>'parent_id,url,name'));
                    foreach ($category as $item) {
                        //$content = str_replace($item->name,'<a href="http://www.ronghedai.com/zixun/'.$item->url.'/">'.$item->name.'</a>' ,$content );
                        $content = preg_replace('/'.$item->name.'/','<a href="http://www.ronghedai.com/zixun/'.$item->url.'/">'.$item->name.'</a>' ,$content ,1 );
                    }
                    $column = new Category();
                    $column->parent_id = $parent_id;
                    $column->name = $name;
                    $column->keyword = $keyword;
                    $column->url = $url;
                    $column->content = htmlspecialchars($content);
                    $column->description = $description;

                    if ($column->create() == false) {
                        $errorMessage = $column->getErrorMessages()[0];
                    } else {
                        $response = new Response();
                        $response->redirect("/zixun/backendrhd/columnlist");
                        $this->view->disable();
                        return $response;
                    }
                }
            } else {
                $errorMessage = '非法操作';
            }
        }
        $this->view->errorMessage = $errorMessage;
        $this->view->parents = Category::find(array('parent_id=0','columns'=>'id,name'));
    }

    public function ColumnListAction($parent_id = 0, $page = 1) {
        $parent_id = (int) $parent_id;
        $page = (int) $page;
        $this->checkIsLogin();
        $columns = Category::find(array('parent_id='.$parent_id));
        $pages = new stdClass();
        $pages->items = $columns ;
        $this->view->page = $pages;
    }

    public function EditColumnAction($id = 0) {
        $id = (int) $id;
        $this->checkIsLogin();
        $column = Category::findFirst($id);
        if ($column == false) {
            $response = new Response();
            $response->redirect("/zixun/backendrhd/columnlist");
            $this->view->disable();
            return $response;
        }
        if ($this->request->isPost()) {

            $parent_id = $this->request->getPost('parent_id', 'int');
            $name = $this->request->getPost('name', 'string');
            $keyword = $this->request->getPost('keyword', 'string');
            $description = $this->request->getPost('description', 'string');
            $url = $this->request->getPost('url', 'string');
            $content = $this->request->getPost('content');
            $column->name = $name;
            $column->parent_id = $parent_id;
            $column->keyword = $keyword;
            $column->url = $url;
            $column->content = htmlspecialchars($content);
            $column->description = $description;
            if ($column->save() == false) {
                $errorMessage = $column->getMessages()[0];
            } else {
                $response = new Response();
                $response->redirect("/zixun/backendrhd/editcolumn");
                $this->view->disable();
                return $response;
            }
        }
        $this->view->parents = Category::find(array('parent_id=0','columns'=>'id,name'));
        $this->view->errorMessage = $errorMessage;
        $this->view->column = $column;
    }

    public function DelColumnAction($id = 0) {
        $id = (int) $id;
        $errorMessage = '';
        $this->checkIsLogin();
        $column = Category::findFirst($id);
        if ($this->request->isPost()) {
            if ($this->security->checkToken()) {
                $parent_id = $this->request->getPost('parent_id', 'int');
                $this->db->query('update rhd_articles set first_category_id='.$column->parent_id.',second_category_id='.$parent_id.' WHERE second_category_id='.$id)->execute();;
                $column->delete();
                $response = new Response();
                $response->redirect("/zixun/backendrhd/columnlist");
                $this->view->disable();
                return $response;
            } else {
                $errorMessage = '参数非法';
            }
        }
        $this->view->errorMessage = $errorMessage;
        $this->view->parents = Category::find(array('parent_id<>0 and id<>'.$id,'columns'=>'id,name'));
    }

    public function AddArticlesAction() {
        $errorMessage = '';
        $this->checkIsLogin();
        if ($this->request->isPost()) {
            if ($this->security->checkToken()) {
                $parent_id = $this->request->getPost('parent_id');
                $name = $this->request->getPost('name');
                $keyword = $this->request->getPost('keyword');
                $description = $this->request->getPost('description');
                $content = $this->request->getPost('content');
                $source = $this->request->getPost('source');
                if ($parent_id == '0' || $name == '' || $keyword== '' || $content== '') {
                    $errorMessage = '参数输入不完成';
                } else {
                    $category = Category::find(array('1=1', 'columns'=>'parent_id,url,name'));
                    foreach ($category as $item) {
                        //$content = str_replace($item->name,'<a href="http://www.ronghedai.com/zixun/'.$item->url.'/">'.$item->name.'</a>' ,$content );
                        $content = preg_replace('/'.$item->name.'/','<a href="http://www.ronghedai.com/zixun/'.$item->url.'/">'.$item->name.'</a>' ,$content ,1 );
                    }


                    $article = new Articles();
                    $article->name = $name;
                    $article->first_category_id = $parent_id;
                    $article->keyword = $keyword;
                    $article->description = $description;
                    $article->source = $source;
                    $article->content = $content;
                    if ($article->create() == false) {
                        $errorMessage = $article->getMessages()[0];
                    } else {
                        $response = new Response();
                        $response->redirect("/zixun/backendrhd/addarticles");
                        $this->view->disable();
                        return $response;
                    }
                }
            } else {
                $errorMessage = '参数非法';
            }
        }
        //获取分类
        $this->view->errorMessage = $errorMessage;
        $this->view->parents = Category::find(array('parent_id>0 ','columns'=>'id,parent_id,name'));
    }

    public function ArticlesListAction($page = 0) {
        $this->checkIsLogin();
        $page = (int) $page;
        $this->checkIsLogin();
        $columns = Articles::find(array('','order'=>'id desc'));
        $paginator   = new PaginatorModel(
            array(
                "data"  => $columns,
                "limit" => 10,
                "page"  => $page
            )
        );
        // Get the paginated results
        $pages = $paginator->getPaginate();
        $this->view->pages = $pages;
    }

    public function EditArticlesAction($id = 0)
    {
        $errorMessage = '';
        $id = (int) $id;
        $this->checkIsLogin();
        $article = Articles::findFirst( $id );
        if ($article == false) {
            $response = new Response();
            $response->redirect("/zixun/backendrhd/articleslist");
            $this->view->disable();
            return $response;
        }

        if ($this->request->isPost()) {
            if ($this->security->checkToken()) {
                $parent_id = $this->request->getPost('parent_id');
                $name = $this->request->getPost('name');
                $keyword = $this->request->getPost('keyword');
                $description = $this->request->getPost('description');
                $content = $this->request->getPost('content');
                $source = $this->request->getPost('source');
                if ($parent_id == '0' || $name == '' || $keyword == '' || $content == '') {
                    $errorMessage = '参数输入不完成';
                } else {
                    $article->name = $name;
                    $article->first_category_id = $parent_id;
                    $article->keyword = $keyword;
                    $article->description = $description;
                    $article->source = $source;
                    $article->content = $content;
                    if ($article->save() == false) {
                        $errorMessage = $article->getMessages()[0];
                        echo $article->first_category_id;
                        $this->view->disable();
                    } else {
                        $response = new Response();
                        $response->redirect("/zixun/backendrhd/articleslist");
                        $this->view->disable();
                        return $response;
                    }
                }
            } else {
                $errorMessage = '参数非法';
            }
        }
        $this->view->article = $article;
        $this->view->errorMessage = $errorMessage;
        $this->view->parents = Category::find(array('parent_id>0 ','columns'=>'id,parent_id,name'));
    }


    public function DelArticlesAction($id = 0) {
        $id = (int) $id;
        $this->checkIsLogin();
        Articles::findFirst($id)->delete();
        $response = new Response();
        $response->redirect("/zixun/backendrhd/articleslist");
        $this->view->disable();
        return $response;
    }


    public function AddLinksAction() {
        $errorMessage = '';
        $this->checkIsLogin();
        if($this->request->isPost()) {
            if ($this->security->checkToken()) {
                $name = $this->request->getPost('name', 'string');
                $url = $this->request->getPost('url', 'string');
                $category_id = $this->request->getPost('category_id', 'int');
                if ($name == '' || $url == '') {
                    $errorMessage = '缺少参数';
                } else {
                    $links = new Links();
                    $links->name = $name;
                    $links->url = $url;
                    $links->category_id = $category_id;
                    if ($links->create() == false) {
                        $errorMessage = $links->getMessage()[0];
                    } else {
                        $response = new Response();
                        $response->redirect("/zixun/backendrhd/linkslist");
                        $this->view->disable();
                        return $response;
                    }
                }
            } else {
                $errorMessage = '参数非法';
            }
        }
        $this->view->parents = Category::find(array('parent_id=0','columns'=>'id,name'));
        $this->view->errorMessage = $errorMessage;

    }

    public function LinksListAction($page = 0) {
        $page = (int) $page;
        $this->checkIsLogin();
        $columns = Links::find(array('','order'=>'id desc'));
        $paginator   = new PaginatorModel(
            array(
                "data"  => $columns,
                "limit" => 10,
                "page"  => $page
            )
        );
        // Get the paginated results
        $pages = $paginator->getPaginate();
        $this->view->pages = $pages;

    }

    public function DelLinksAction($id) {
        $id = (int) $id;
        $this->checkIsLogin();
        Links::findFirst($id)->delete();
        $response = new Response();
        $response->redirect("/zixun/backendrhd/linkslist");
        $this->view->disable();
        return $response;
    }

    /**
     * 检查是否登录
     * @return bool
     */
    private function checkIsLogin() {
        if ($this->session->has("username")) {
            return true;
        } else {
            $response = new Response();
            $response->redirect("/zixun/backendrhd/index", true, 301)->sendHeaders();
            $this->view->disable();
        }
    }
    
    public function addurlsAction(){
        $errorMessage = '';
        $this->checkIsLogin();
        if($this->request->isPost()){
            if ($this->security->checkToken()) {
                $original_url = $this->request->getPost('original_url','string');
                $jump_url = $this->request->getPost('jump_url','string');
                
                if(preg_match('/http:\/\/[\w.]+[\w\/]*[\w.]*\??[\w=&\+\%]*/is',$original_url) && 
                    preg_match('/http:\/\/[\w.]+[\w\/]*[\w.]*\??[\w=&\+\%]*/is',$jump_url)) 
                {
                    //生成短识别码
                    $short = Shorturl::short($original_url);
                    $res = Urls::findFirst("short_id = '$short_id'");
                    if ($res) {
                        $errorMessage = "此URL已经存在，请重新确认";
                    } else {
                    //curl采集title
                    $url = $original_url;
            	    $ch = curl_init();
            	    curl_setopt($ch, CURLOPT_URL, $url);
            	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            	    curl_setopt($ch, CURLOPT_HEADER, 1);
            	    curl_setopt($ch, CURLOPT_USERAGENT, 1);
            	    curl_setopt($ch, CURLOPT_FOLLOWLOCATION,1);
            	    curl_setopt($ch, CURLOPT_ENCODING, 'gzip');
            	    $data = curl_exec($ch);
            	    curl_close($ch);
                    $pos = strpos($data,"charset=utf-8");
                    if(!$pos) { $data = iconv("gbk","utf-8",$data);}
            	    preg_match("/<title>(.*)<\/title>/i",$data, $title);
            	    $url_title = $title[1]; 
            	    
                    if($this->request->hasFiles() && $original_url !='' && $jump_url !='' && $short !='') {
                        foreach($this->request->getUploadedFiles() as $file) {
                            if($file->getName() == ""){
                                $errorMessage="没有上传图片";
                            }else {
                            $file_upload = $this->getFolder().'/'.$this->getName($file->getName());
                          

                          	//var_dump(is_writeable($this->getFolder().'/'));
                          	//exit;
                            $ret = $file->moveTo($file_upload);
                            if ($ret === false) {
                                $errorMessage="图片上传失败！";
                            } else {
                               $urls = new Urls();
                                    $urls->original_url = $original_url;
                                    $urls->short_id = $short[0];
                                    $urls->jump_url = $jump_url;
                                    $urls->pic_address = $file_upload;
                                    $urls->total_click = 0;
                                    $urls->url_title = $url_title;
                                if ($urls->create() == false) {
                                    $errorMessage = $urls->getMessages()[0];
                                } else {
                                    $response = new Response();
                                    $response->redirect("/zixun/backendrhd/urlslist");
                                    $this->view->disable();
                                    return $response;
                                } 
                            }

                            
                        }
                        }

                   }else {
                       $errorMessage="参数输入不完整，请检查";
                   }
               }
                 }else {
                     $errorMessage="非URL格式";
                 }
            }
        }
        
        $this->view->errorMessage = $errorMessage;
    }
    
   /**
     * 重命名文件
     * @return string
     */
    private function getName($fileName)
    {
        return  time() . rand( 1 , 10000 ) . $this->getFileExt($fileName);
    }
    /**
     * 获取文件扩展名
     * @return string
     */
    private function getFileExt($fileName)
    {
        return strtolower( strrchr( $fileName , '.' ) );
    }
    /**
     * 按照日期自动创建存储文件夹
     * @return string
     */
    private function getFolder()
    {
        $pathStr = '../dyupfiles/weixinad';
        if ( strrchr( $pathStr , "/" ) != "/" ) {
            $pathStr .= "/";
        }
        $pathStr .= date( "Ymd" );
        if ( !file_exists( $pathStr ) ) {
            if ( !mkdir( $pathStr , 0777 , true ) ) {
                return false;
            }
        }
        return $pathStr;
    }

    public function urlslistAction($page = 0){
        $page = (int) $page;
        $this->checkIsLogin();
        $columns = Urls::find(array('','order'=>'id desc'));
        $paginator   = new PaginatorModel(
            array(
                "data"  => $columns,
                "limit" => 10,
                "page"  => $page
            )
        );
        // Get the paginated results
        $pages = $paginator->getPaginate();
        $this->view->pages = $pages;
    }
    
    public function delurlsAction(){
        $id = $this->request->get("id",'int');
        $this->checkIsLogin();
        Urls::findFirst($id)->delete();
        $response = new Response();
        $response->redirect("/zixun/backendrhd/urlslist");
        $this->view->disable();
        return $response;
    }
    
    public function editurlsAction(){
        $id = $this->request->get("id",'int');
        $this->checkIsLogin();
        $errorMessage="";
        $url = Urls::findFirst($id);
        $this->view->url = $url ;
        if($this->request->isPost()){
            $url_title = $this->request->getPost("url_title",'string');
            $url->url_title = $url_title;
            if($url->save()){
                $this->response->redirect("/zixun/backendrhd/urlslist");
            }else {
                $errorMessage = "修改失败";
                $this->view->errorMessage = $errorMessage;
            }
        }
    }
    
}