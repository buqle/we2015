<?php
/**
 * Created by PhpStorm.
 * User: forest
 * Date: 2016/5/10
 * Time: 11:35
 */
use Phalcon\Mvc\Model;
class Users extends Model {
    public function getSource() {
        return 'rhd_admin_users';
    }
    public function getRegTime() {
        return $this->_formartTime($this->add_time);
    }
    public function getLastLoginTime() {
        return $this->_formartTime($this->last_login_time);
    }
    private function _formartTime ($time) {
        return date('Y-m-d h:i:s',$time);
    }
}