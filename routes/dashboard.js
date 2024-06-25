const express=require('express')
const router=express.Router()

const dashBoardController=require('../controllers/dashboardController')


router.get('/dashboard',dashBoardController.dashboard)

router.route('/dashboard/add')
    .get(dashBoardController.addNotePage)
    .post(dashBoardController.addNotes)


router.route('/dashboard/search')

    .post(dashBoardController.searchNote)

router.get('/dashboard/item/:id',dashBoardController.viewNote)

router.post('/dashboard/item/:id',dashBoardController.updateNote)
router.post('/dashboard/item-delete/:id',dashBoardController.deleteNote)
    


module.exports=router