import { ExecutionContext } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { Observable } from "rxjs"


export class JWTauthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext){
        return super.canActivate(context)
    }
}