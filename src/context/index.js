import AuthProvider from './AuthContext'
import UserProvider from './UserContext'
import DocketProvider from './DocketContext'
import PatentProvider from './PatentContext'
import TrademarkProvider from './TrademarkContext'
import UploadProvider from './UploadContext'
import ReportProvider from './ReportContext'



export { AuthContext } from './AuthContext'
export { UserContext } from './UserContext'
export { DocketContext } from './DocketContext'
export { PatentContext } from './PatentContext'
export { TrademarkContext } from './TrademarkContext'
export { UploadContext } from './UploadContext'
export { ReportContext } from './ReportContext'

export default {
  AuthProvider,
  UserProvider,
  UploadProvider,
  DocketProvider,
  TrademarkProvider,
  PatentProvider,
  ReportProvider
}
