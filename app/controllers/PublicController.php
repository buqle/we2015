<?php
/**
* 
*/
use Phalcon\Http\Response;

class PublicController extends \Phalcon\Mvc\Controller
{
	public function indexAction($aaa = '') {
       $result = Urls::findFirst("short_id = '$aaa'");
       if($result) {
         $this->view->result = $result;
       }else {
         echo "没有此短网址";
         $this->view->disable();
         exit;
       }
       
	}
}