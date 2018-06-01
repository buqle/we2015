<?php
/**
* 
*/
use Phalcon\Http\Response;
class IndexController extends \Phalcon\Mvc\Controller
{
	private $response ;
	public function initialize()
	{
		$this->view->setTemplateBefore('hearder');
	}
    public function onConstruct() {
        //$this->response = new Response();
    }
	public function indexAction() {



		$url =  $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
		$self_url = str_replace($_SERVER['HTTP_HOST'].'/','', $url);
		$urls = explode("/", $self_url);
		$count = count($urls);
		if (( $count==1 && !empty($urls[0]) ) || ( $count==2 && empty($urls[1]) ) || ( $count== 2 && strstr($urls[1], 'list_' ) ) ) {
            if ( $count==2 && strstr($urls[1], 'list_') ) {
				$this->getHomeList($urls[0],str_replace('list_', '', $urls[1]));
			} else {
                //内容和主页分开
                if(strstr($urls[0], 'show_')) {
                    $this->showArticle(str_replace('show_', '', $urls[0]));
                } else {

                    $this->getHomePage($urls[0]);
                }
			}
		} else if ( $count==2 || ( $count==3 && empty($urls[2]) ) || ( $count== 3 && strstr($urls[2], 'list_' ) ) ) {
			if ( $count==3 && strstr($urls[2], 'list_' ) ) {
                $this->getHomeList($urls[1], str_replace('list_', '', $urls[2]));
			} else {
                if(strstr($urls[1], 'show_')) {
                    $this->showArticle(str_replace('show_', '', $urls[1]));
                } else {
                    $this->getHomePage($urls[1]);
                }
			}
		}
	}

	private function getHomePage($first) {

        $this->view->category = $this->getCategory($first);
        if (empty($this->view->category['category'])) {
            $response = new Response();
            if ($first == 'zixun') {
                $response->redirect("../" , true, 301)->sendHeaders();
            } else {
                $response->redirect("./" , true, 301)->sendHeaders();
            }

            $this->view->disable();
        }
        $this->view->title = $this->view->category['category']->name;
        $this->view->keyword = $this->view->category['category']->keyword;
        $this->view->description = $this->view->category['category']->description;
        if (empty($this->view->category['parent'])) {
            if (empty($this->view->category['category'])) {
                $this->view->seconds = array();
            } else {
                $this->view->seconds = $this->getAllSecond($this->view->category['category']->id);
            }
            $this->view->pick("index/indexhome");
        } else{
            $this->view->pick("index/second");
        }



	}
	private function getHomeList($first, $page = 0) {
        $page = (int) $page;
        if ($page == 0 || $page < 2) {
            $response = new Response();
            $response->redirect("./" , true, 301)->sendHeaders();
			$this->view->disable();
		} else {
            $this->view->category = $this->getCategory($first);
            if (empty($this->view->category['category'])) {
                $response = new Response();
                $response->redirect("./" , true, 301)->sendHeaders();
                $this->view->disable();
            }
            $this->view->title = $this->view->category['category']->name;
            $this->view->keyword = $this->view->category['category']->keyword;
            $this->view->description = $this->view->category['category']->description;
            //已经栏目页面
            if (empty($this->view->category['parent'])) {
                $this->view->pages = $this->getPage($this->view->category['category']->id, $page, false);
                $this->view->pick("index/indexlist");
            } else {
                $this->view->pages = $this->getPage($this->view->category['category']->id, $page, true);
                $this->view->pick("index/secondlist");
            }
		}
	}
	private function showArticle($id = 0) {
        $id = (int) $id;
        $article = Articles::findFirst($id);
        if ($article == false) {
            $response = new Response();
            $response->redirect("./" , true, 301)->sendHeaders();
            $this->view->disable();
        } else {
            $this->view->title = $article->name;
            $this->view->keyword = $article->keyword;
            $this->view->description = $article->description;
            $this->view->category = $this->getCategory($article->category->url);
            $this->view->article = $article;
            $this->view->pick("index/article");
            //
        }
	}


    private function getPage($categoryID, $page, $isSecond = false) {
        if ($isSecond) {
            $where = 'second_category_id='.$categoryID;
        } else {
            $where = 'first_category_id='.$categoryID;
        }
        $articles = Articles::find(array($where, 'order'=> 'id desc'));
        $paginator   = new \Phalcon\Paginator\Adapter\Model (
            array(
                "data"  => $articles,
                "limit" => 10,
                "page"  => $page
            )

        );
        return $paginator->getPaginate();
    }
	/**
	 *
	 * @param object
	 */
	private function getCategory( $name ) {
        $retArray = array('category'=>'', 'parent'=> '');
        if (preg_match( "/([a-zA-Z0-9_-]+)$/", $name)) {
            $category = Category::findFirst( 'url=\''.$name.'\'' );
            if ($category !== false) {
                $retArray['category'] = $category;
                if ($category->parent_id <> 0) {
                    $retArray['parent'] = $category = Category::findFirst( $category->parent_id );
                }
            }
        }
        return $retArray;
	}

    /**
     * 获取所有的二级分类
     * @param $id
     * @return stdClass
     */
    private function getAllSecond( $id ) {
        $id = (int) $id;
        $seconds = Category::find(array(
            'parent_id='.$id,
            'columns'=>'name,url'
        ));
        if ($seconds == false) {
            return array();
        }
        return $seconds;
    }
}